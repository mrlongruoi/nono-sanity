import groq from "groq";
import { sanityFetch } from "../../helpers/sanityFetch";


interface CreateStudentProps {
  clerkId: string;
  email: string;
  firstName?: string;
  lastName?: string;
  imageUrl?: string;
}

// Minimal Student shape used here — apps/lms has a generated Student type, but
// keeping a small type avoids coupling this package to generated types.
type Student = {
  _id?: string;
  _type?: "student";
  clerkId?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  imageUrl?: string;
};

export async function createStudentIfNotExists({
  clerkId,
  email,
  firstName,
  lastName,
  imageUrl,
}: CreateStudentProps) {
  // First check if student exists — sanityFetch returns the query result directly
  // (not wrapped in a `.data` property), so we request Student | null.
  const existingStudent = await sanityFetch<Student | null>(
    groq`*[_type == "student" && clerkId == $clerkId][0]`,
    { clerkId }
  );

  if (existingStudent) {
    console.log("Student already exists", existingStudent);
    return existingStudent;
  }

  // If no student exists, create a new one
  const { getServerClient } = await import("../../clients/client.server");

  const newStudent = await getServerClient().create({
    _type: "student",
    clerkId,
    email,
    firstName,
    lastName,
    imageUrl,
  });

  console.log("New student created", newStudent);

  return newStudent as Student;
}