import { getCourseByIdQuery } from "@workspace/sanity-utils/groq/course/getCourseById";
import { redirect } from "next/navigation";
import { sanityFetch } from "@workspace/sanity-utils/live/live.server";

interface CoursePageProps {
  params: Promise<{
    courseId: string;
  }>;
}

export default async function CoursePage({ params }: Readonly<CoursePageProps>) {
  const { courseId } = await params;
  const { data: course } = await sanityFetch({ query: getCourseByIdQuery, params: { id: courseId } });

  console.log("📚 Course Page Debug:", {
    courseId,
    courseFound: !!course,
    courseTitle: course?.title,
    modulesCount: course?.modules?.length,
    firstModule: course?.modules?.[0] ? {
      id: course.modules[0]._id,
      lessonsCount: course.modules[0].lessons?.length,
      firstLesson: course.modules[0].lessons?.[0] ? {
        _id: course.modules[0].lessons[0]._id,
        title: course.modules[0].lessons[0].title,
        slug: course.modules[0].lessons[0].slug,
      } : null,
    } : null,
  });

  if (!course) {
    return redirect("/");
  }

  // Redirect to the first lesson of the first module if available
  const firstLesson = course.modules?.[0]?.lessons?.[0];
  if (firstLesson?._id) {
    console.log("🔀 Redirecting to lesson:", {
      courseId,
      lessonId: firstLesson._id,
      url: `/dashboard/courses/${courseId}/lessons/${firstLesson._id}`,
    });
    return redirect(
      `/dashboard/courses/${courseId}/lessons/${firstLesson._id}`
    );
  }

  return (
    <div className="h-full flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Welcome to {course.title}</h2>
        <p className="text-muted-foreground">
          This course has no content yet. Please check back later.
        </p>
      </div>
    </div>
  );
}