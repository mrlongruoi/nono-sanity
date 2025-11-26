import { defineQuery } from "groq";
import { sanityFetch } from "../../helpers/sanityFetch";


export async function getStudentByClerkId(clerkId: string) {
  const getStudentByClerkIdQuery = defineQuery(
    `*[_type == "student" && clerkId == $clerkId][0]`
  );

  const student = await sanityFetch<any>(getStudentByClerkIdQuery, { clerkId });

  // Wrap in data property to match expected structure in checkCourseAccess
  return student ? { data: student } : null;
}
