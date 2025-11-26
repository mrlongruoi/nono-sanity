"use client";

import { CheckCircle, Loader2, XCircle } from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { completeLessonAction } from "@/app/actions/completeLessonAction";
import { uncompleteLessonAction } from "@/app/actions/uncompleteLessonAction";
import { getLessonCompletionStatusAction } from "@/app/actions/getLessonCompletionStatusAction";
import { cn } from "@/lib/utils";

interface LessonCompleteButtonProps {
  lessonId: string;
  clerkId: string;
}

export function LessonCompleteButton({
  lessonId,
  clerkId,
}: Readonly<LessonCompleteButtonProps>) {
  const [isCompleted, setIsCompleted] = useState<boolean | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [isPendingTransition, startTransition] = useTransition();
  const toggleControllerRef = useRef<AbortController | null>(null);
  const router = useRouter();

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    startTransition(async () => {
      try {
        const status = await getLessonCompletionStatusAction(lessonId, clerkId);

        if (signal.aborted) {
          return;
        }

        setIsCompleted(status);
      } catch (error: unknown) {
        if (signal.aborted) {
          // Ignore abort errors to avoid noisy logs when the component unmounts.
          return;
        }

        console.error("Error checking lesson completion status:", error);
        setIsCompleted(false);
      }
    });

    return () => {
      controller.abort();
    };
  }, [lessonId, clerkId]);

  const handleToggle = async () => {
    // Abort any in-flight toggle before starting a new one
    if (toggleControllerRef.current) {
      toggleControllerRef.current.abort();
    }

    const controller = new AbortController();
    toggleControllerRef.current = controller;
    const { signal } = controller;

    setIsPending(true);

    try {
      if (isCompleted) {
        await uncompleteLessonAction(lessonId, clerkId);
      } else {
        await completeLessonAction(lessonId, clerkId);
      }

      const newStatus = await getLessonCompletionStatusAction(lessonId, clerkId);

      if (signal.aborted) {
        return;
      }

      startTransition(() => {
        setIsCompleted(newStatus);
        router.refresh();
      });
    } catch (error: unknown) {
      if (signal.aborted) {
        // Ignore AbortError-like cancellations
        return;
      }

      console.error("Error toggling lesson completion:", error);
    } finally {
      if (toggleControllerRef.current === controller) {
        toggleControllerRef.current = null;
      }
      setIsPending(false);
    }
  };

  const isLoading = isCompleted === null || isPending || isPendingTransition;

  // Determine button content based on state
  const getButtonContent = () => {
    if (isLoading) {
      return (
        <>
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          Updating...
        </>
      );
    }

    if (isCompleted) {
      return (
        <>
          <XCircle className="h-4 w-4 mr-2" />
          Mark as Not Complete
        </>
      );
    }

    return (
      <>
        <CheckCircle className="h-4 w-4 mr-2" />
        Mark as Complete
      </>
    );
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-sm border-t z-50">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
        <div className="flex-1">
          <p className="text-sm font-medium">
            {isCompleted
              ? "Lesson completed!"
              : "Ready to complete this lesson?"}
          </p>
          <p className="text-sm text-muted-foreground">
            {isCompleted
              ? "You can mark it as incomplete if you need to revisit it."
              : "Mark it as complete when you're done."}
          </p>
        </div>
        <Button
          onClick={handleToggle}
          disabled={isLoading}
          size="lg"
          variant="default"
          className={cn(
            "min-w-[200px] transition-all duration-200 ease-in-out",
            isCompleted
              ? "bg-red-600 hover:bg-red-700 text-white"
              : "bg-green-600 hover:bg-green-700 text-white"
          )}
        >
          {getButtonContent()}
        </Button>
      </div>
    </div>
  );
}