import { defineQuery } from "groq";
import { sanityFetch } from "../../live/live";
import type { GetEnrolledCoursesQueryResult } from "@workspace/sanity-types";

type EnrolledCourse = NonNullable<GetEnrolledCoursesQueryResult>["enrolledCourses"][number];

export async function getEnrolledCourses(clerkId: string): Promise<EnrolledCourse[]> {
  const getEnrolledCoursesQuery = defineQuery(`
    *[_type == "student" && clerkId == $clerkId][0]{
      "enrolledCourses": *[_type == "enrollment" && student._ref == ^._id]{
        _id,
        _type,
        _createdAt,
        _updatedAt,
        _rev,
        student,
        amount,
        paymentId,
        enrolledAt,
        course->{
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
          category->{
            _id,
            _type,
            title,
            slug
          },
          instructor->{
            _id,
            _type,
            name,
            bio,
            photo
          },
          modules
        }
      }
    }
  `);

  const response = await sanityFetch({ query: getEnrolledCoursesQuery, params: { clerkId } });
  const result = response.data;

  return result?.enrolledCourses || [];
}
