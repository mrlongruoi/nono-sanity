import { isEnrolledInCourse } from "@workspace/sanity-utils/groq/student/isEnrolledInCourse";
import { getStudentByClerkId } from "@workspace/sanity-utils/groq/student/getStudentByClerkId";
import { getCourseById } from "@workspace/sanity-utils/groq/course/getCourseById";

interface AuthResult {
  isAuthorized: boolean;
  redirect?: string;
  studentId?: string;
}

export async function checkCourseAccess(
  clerkId: string | null,
  courseId: string
): Promise<AuthResult> {
  if (!clerkId) {
    return {
      isAuthorized: false,
      redirect: "/",
    };
  }

  const student = await getStudentByClerkId(clerkId);
  if (!student?.data?._id) {
    console.error("checkCourseAccess: Student not found or missing _id", {
      clerkId,
      studentData: student,
    });
    return {
      isAuthorized: false,
      redirect: "/",
    };
  }

  const isEnrolled = await isEnrolledInCourse(clerkId, courseId);
  const course = await getCourseById(courseId);

  if (!isEnrolled) {
    const courseSlug = course?.slug?.current;

    if (!course || !courseSlug) {
      console.warn(
        "checkCourseAccess: Course not found or missing slug for unauthorized access redirect",
        { clerkId, courseId }
      );

      return {
        isAuthorized: false,
        redirect: "/courses",
      };
    }

    return {
      isAuthorized: false,
      redirect: `/courses/${courseSlug}`,
    };
  }

  return {
    isAuthorized: true,
    studentId: student.data._id,
  };
}