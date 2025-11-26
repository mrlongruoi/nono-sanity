import { defineQuery } from "groq";
import { sanityFetch } from "../../helpers/sanityFetch";

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

export async function getLessonCompletions(studentId: string, courseId: string) {
  type CompletionResult = {
    completedLessons?: Array<any>;
    course?: { modules?: Array<any> } | null;
  };

  const result = await sanityFetch<CompletionResult>(getCompletionsQuery, {
    studentId,
    courseId,
  });

  // Ensure we always return a consistent shape
  const completedLessons = result?.completedLessons || [];
  const course = result?.course || null;

  return {
    completedLessons,
    course,
  };
}
