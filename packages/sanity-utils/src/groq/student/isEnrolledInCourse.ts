import groq from "groq";
import { sanityFetch } from "../../live/live";

export async function isEnrolledInCourse(clerkId: string, courseId: string) {
  try {
    // First get the student document using clerkId — this query returns the _id string or null
    const isEnrolledStudentIdQuery = groq`*[_type == "student" && clerkId == $clerkId][0]._id`;
    const studentResponse = await sanityFetch({ query: isEnrolledStudentIdQuery, params: { clerkId } });
    const studentId = studentResponse.data;

    if (!studentId) {
      console.log("No student found with clerkId:", clerkId);
      return false;
    }

    // Then check for enrollment using the student's Sanity document ID
    const isEnrolledEnrollmentQuery = groq`*[_type == "enrollment" && student._ref == $studentId && course._ref == $courseId][0]`;
    const enrollmentResponse = await sanityFetch({ 
      query: isEnrolledEnrollmentQuery, 
      params: {
        studentId,
        courseId,
      }
    });

    return !!enrollmentResponse.data;
  } catch (error) {
    console.error("Error checking enrollment status:", error);
    return false;
  }
}