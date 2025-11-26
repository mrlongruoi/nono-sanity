import { defineQuery } from "groq";
import { sanityFetch } from "../../helpers/sanityFetch";
import { getStudentByClerkId } from "../student/getStudentByClerkId";

export const lessonCompletionStatusQuery = defineQuery(`
  *[_type == "lessonCompletion"
    && student._ref == $studentId
    && lesson._ref == $lessonId][0]
`);

export async function getLessonCompletionStatus(lessonId: string, clerkId: string) {
  const s = await getStudentByClerkId(clerkId);
  if (!s?.data?._id) throw new Error("Student not found");

  const result = await sanityFetch(lessonCompletionStatusQuery, {
    studentId: s.data._id,
    lessonId,
  });

  return result !== null;
}
