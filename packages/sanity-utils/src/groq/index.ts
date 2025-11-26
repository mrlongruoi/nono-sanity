// Re-export GROQ queries so studio typegen finds them reliably
export * from "./course/getCourseById";
export * from "./course/getCourseBySlug";
export * from "./course/getCourses";
export * from "./course/searchCourses";

export * from "./lessons/completeLessonById";
export * from "./lessons/getCourseProgress";
export * from "./lessons/getLessonById";
export * from "./lessons/getLessonCompletions";
export * from "./lessons/getLessonCompletionStatus";
export * from "./lessons/uncompleteLessonById";

export * from "./student/createEnrollment";
export * from "./student/createStudentIfNotExists";
export * from "./student/getEnrolledCourses";
export * from "./student/getStudentByClerkId";
export * from "./student/isEnrolledInCourse";
