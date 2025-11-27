import { defineQuery } from "groq";
import { sanityFetch } from "../../live/live";


export async function getStudentByClerkId(clerkId: string) {
  const getStudentByClerkIdQuery = defineQuery(
    `*[_type == "student" && clerkId == $clerkId][0]`
  );

  const result = await sanityFetch({ query: getStudentByClerkIdQuery, params: { clerkId } });
  const student = result.data;

  // Wrap in data property to match expected structure in checkCourseAccess
  return student ? { data: student } : null;
}
