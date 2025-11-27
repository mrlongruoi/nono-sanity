import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { getLessonByIdQuery } from "@workspace/sanity-utils/groq/lessons/getLessonById";
import { PortableText } from "@portabletext/react";
import { LoomEmbed } from "@/components/LoomEmbed";
import { VideoPlayer } from "@/components/VideoPlayer";
import { LessonCompleteButton } from "@/components/LessonCompleteButton";
import { sanityFetch } from "@workspace/sanity-utils/live/live.server";

interface LessonPageProps {
  params: Promise<{
    courseId: string;
    lessonId: string;
  }>;
}

export default async function LessonPage({ params }: Readonly<LessonPageProps>) {
  const user = await currentUser();
  const { courseId, lessonId } = await params;

  console.log("🔍 Lesson Page Debug:", {
    courseId,
    lessonId,
    lessonIdType: typeof lessonId,
  });

  const { data: lesson } = await sanityFetch({ query: getLessonByIdQuery, params: { id: lessonId } });

  console.log("📦 Lesson Fetch Result:", {
    lessonFound: !!lesson,
    lessonData: lesson ? {
      _id: lesson._id,
      title: lesson.title,
    } : null,
  });

  if (!lesson) {
    console.log("❌ Lesson not found, redirecting to course:", courseId);
    return redirect(`/dashboard/courses/${courseId}`);
  }

  // Debug logging (server-side)
  console.log("🎬 Lesson Data:", {
    id: lesson._id,
    title: lesson.title,
    hasVideoUrl: !!lesson.videoUrl,
    videoUrl: lesson.videoUrl,
    hasLoomUrl: !!lesson.loomUrl,
    loomUrl: lesson.loomUrl,
  });

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto pt-12 pb-20 px-4">
          <h1 className="text-2xl font-bold mb-4">{lesson.title}</h1>

          {lesson.description && (
            <p className="text-muted-foreground mb-8">{lesson.description}</p>
          )}

          <div className="space-y-8">
            {/* Video Section */}
            {lesson.videoUrl && <VideoPlayer url={lesson.videoUrl} />}

            {/* Loom Embed Video if loomUrl is provided */}
            {lesson.loomUrl && <LoomEmbed shareUrl={lesson.loomUrl} />}

            {/* Lesson Content */}
            {lesson.content && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Lesson Notes</h2>
                <div className="prose prose-blue dark:prose-invert max-w-none">
                  <PortableText value={lesson.content} />
                </div>
              </div>
            )}

            <div className="flex justify-end">
              <LessonCompleteButton lessonId={lesson._id} clerkId={user!.id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}