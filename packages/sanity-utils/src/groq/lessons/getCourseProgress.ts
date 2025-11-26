import { defineQuery } from "groq";
import { sanityFetch } from "../../helpers/sanityFetch";
import { getStudentByClerkId } from "../student/getStudentByClerkId";
import { calculateCourseProgress } from "../../lib/courseProgress";
import { Module } from "@workspace/sanity-types";

export const courseProgressQuery = defineQuery(`
{
  "completedLessons": *[_type == "lessonCompletion"
    && student._ref == $studentId
    && course._ref == $courseId]{
      _id,
      _type,
      _createdAt,
      _updatedAt,
      _rev,
      student,
      course,
      module,
      completedAt,
      "lesson": lesson->{
        _id,
        _type,
        title,
        slug,
        description,
        videoUrl,
        loomUrl,
        content,
        module
      },
      "module": module->{
        _id,
        _type,
        title,
        lessons,
        course
      }
    },
  "course": *[_type == "course" && _id == $courseId][0]{
    _id,
    _type,
    _createdAt,
    _updatedAt,
    _rev,
    title,
    price,
    slug,
    description,
    image,
    category,
    instructor,
    "modules": modules[]->{
      _id,
      _type,
      _createdAt,
      _updatedAt,
      _rev,
      title,
      course,
      "lessons": lessons[]->{
        _id,
        _type,
        title,
        slug,
        description,
        videoUrl,
        loomUrl,
        content,
        module
      }
    }
  }
}
`);

export async function getCourseProgress(clerkId: string, courseId: string) {
  const s = await getStudentByClerkId(clerkId);
  if (!s?._id) throw new Error("Student not found");

  type CourseProgressResult = {
    completedLessons?: Array<any>;
    course?: { modules?: Module[] } | null;
  };

  const result = await sanityFetch<CourseProgressResult>(courseProgressQuery, {
    studentId: s._id,
    courseId,
  });

  const { completedLessons = [], course } = result || ({} as CourseProgressResult);

  const courseProgress = calculateCourseProgress(
    (course?.modules as Module[]) || null,
    completedLessons
  );

  return {
    completedLessons,
    courseProgress,
  };
}
