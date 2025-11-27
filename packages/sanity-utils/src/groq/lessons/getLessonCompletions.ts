import { defineQuery } from "groq";
import { sanityFetch } from "../../live/live";

// Typed shapes for the lesson completion projection
export interface ModuleRefSlug {
  current?: string;
}

export interface Module {
  _id: string;
  title?: string;
  slug?: ModuleRefSlug | string;
}

export interface LessonRefSlug {
  current?: string;
}

export interface Lesson {
  _id: string;
  title?: string;
  slug?: LessonRefSlug | string;
  module?: Module | null;
}

export interface CompletedLesson {
  lesson: Lesson;
  completedAt?: string;
  userId?: string;
}

export interface Course {
  modules?: Module[];
}

type CompletionResult = {
  completedLessons?: CompletedLesson[];
  course?: Course | null;
};

export const getCompletionsQuery = defineQuery(`
{
  "completedLessons": *[_type == "lessonCompletion"
    && student._ref == $studentId
    && course._ref == $courseId]{
      ...,
      "lesson": lesson->{...},
      "module": module->{...}
    },
  "course": *[_type == "course" && _id == $courseId][0]{
    ...,
    "modules": modules[]->{
      ...,
      "lessons": lessons[]->{...}
    }
  }
}
`);

export async function getLessonCompletions(studentId: string, courseId: string): Promise<{
  completedLessons: any[];
  course: any;
}> {
  const response = await sanityFetch({ 
    query: getCompletionsQuery, 
    params: {
      studentId,
      courseId,
    }
  });
  
  const result = response.data;

  // Ensure we always return a consistent shape
  const completedLessons = result?.completedLessons || [];
  const course = result?.course || null;

  return {
    completedLessons,
    course,
  };
}
