import groq from "groq";
import { sanityFetch } from "../../helpers/sanityFetch";

export async function isEnrolledInCourse(clerkId: string, courseId: string) {
  try {
    // First get the student document using clerkId — this query returns the _id string or null
    const isEnrolledStudentIdQuery = groq`*[_type == "student" && clerkId == $clerkId][0]._id`;
    const studentId = await sanityFetch<string | null>(isEnrolledStudentIdQuery, { clerkId });

    if (!studentId) {
      console.log("No student found with clerkId:", clerkId);
      return false;
    }

    // Then check for enrollment using the student's Sanity document ID
    const isEnrolledEnrollmentQuery = groq`*[_type == "enrollment" && student._ref == $studentId && course._ref == $courseId][0]`;
    const enrollment = await sanityFetch<Record<string, any> | null>(isEnrolledEnrollmentQuery, {
      studentId,
      courseId,
    });

    return !!enrollment;
  } catch (error) {
    console.error("Error checking enrollment status:", error);
    return false;
  }
}