import { defineQuery } from "groq";
import { getStudentByClerkId } from "../student/getStudentByClerkId";
import { sanityFetch } from "../../helpers/sanityFetch";

export const existingCompletionQuery = defineQuery(`
  *[_type == "lessonCompletion"
    && student._ref == $studentId
    && lesson._ref == $lessonId][0]
`);

export const lessonModuleCourseQuery = defineQuery(`
  *[_type == "lesson" && _id == $lessonId][0]{
    _id,
    "module": *[_type == "module" && references(^._id)][0]{
      _id,
      "course": *[_type == "course" && references(^._id)][0]._id
    }
  }
`);

export async function completeLessonById({
  lessonId,
  clerkId,
}: {
  lessonId: string;
  clerkId: string;
}) {
  const student = await getStudentByClerkId(clerkId);

  if (!student?.data?._id) throw new Error("Student not found");
  const studentId = student.data._id;

  const existing = await sanityFetch<any>(existingCompletionQuery, {
    studentId,
    lessonId,
  });
  if (existing) return existing;

  const lesson = await sanityFetch<{
    module?: { _id?: string; course?: string };
  }>(lessonModuleCourseQuery, { lessonId });

  if (!lesson?.module?._id || !lesson?.module?.course) {
    throw new Error("Module or course not found");
  }

  const { getServerClient } = await import("../../clients/client.server");

  return await getServerClient().create({
    _type: "lessonCompletion",
    student: { _type: "reference", _ref: studentId },
    lesson: { _type: "reference", _ref: lessonId },
    module: { _type: "reference", _ref: lesson.module._id },
    course: { _type: "reference", _ref: lesson.module.course },
    completedAt: new Date().toISOString(),
  });
}
