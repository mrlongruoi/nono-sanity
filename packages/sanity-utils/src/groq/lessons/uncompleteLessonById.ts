import { defineQuery } from "groq";
import { sanityFetch } from "../../helpers/sanityFetch";

import { getStudentByClerkId } from "../student/getStudentByClerkId";

// More descriptive query names to make intent clear and avoid
// potential naming collisions across the codebase.
export const uncompleteLessonStudentQuery = defineQuery(`
  *[_type == "student" && clerkId == $clerkId][0]{ _id }
`);

export const uncompleteLessonCompletionQuery = defineQuery(`
  *[_type == "lessonCompletion"
    && student._ref == $studentId
    && lesson._ref == $lessonId][0]{ _id }
`);

export async function uncompleteLessonById({
  lessonId,
  clerkId,
}: {
  lessonId: string;
  clerkId: string;
}) {
  const student = await getStudentByClerkId(clerkId);
  if (!student?.data?._id) throw new Error("Student not found");

  const completion = await sanityFetch<{ _id: string }>(uncompleteLessonCompletionQuery, {
    studentId: student.data._id,
    lessonId,
  });

  if (!completion?._id) {
    return { success: false, message: "Completion not found" };
  }

  const { getServerClient } = await import("../../clients/client.server");

  try {
    await getServerClient().delete(completion._id);
  } catch (error) {
    console.error("Failed to delete lessonCompletion in uncompleteLessonById", {
      completionId: completion._id,
      lessonId,
      clerkId,
      error,
    });

    throw new Error(
      `Failed to uncomplete lesson. Could not delete completion document with id ${completion._id}.`
    );
  }

  return { success: true, deletedId: completion._id };
}
