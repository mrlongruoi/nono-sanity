

interface CreateEnrollmentParams {
  studentId: string;
  courseId: string;
  paymentId: string;
  amount: number;
}

export async function createEnrollment({
  studentId,
  courseId,
  paymentId,
  amount,
}: CreateEnrollmentParams) {
  const { getServerClient } = await import("../../clients/client.server");
  const client = getServerClient();

  // Idempotent behavior: if an enrollment with the same student, course, and paymentId
  // already exists, return it instead of creating a duplicate. This protects against
  // Stripe webhook retries and manual replays.
  const existing = await client.fetch(
    `*[_type == "enrollment" && student._ref == $studentId && course._ref == $courseId && paymentId == $paymentId][0]`,
    {
      studentId,
      courseId,
      paymentId,
    }
  );

  if (existing) {
    return existing;
  }

  return client.create({
    _type: "enrollment",
    student: {
      _type: "reference",
      _ref: studentId,
    },
    course: {
      _type: "reference",
      _ref: courseId,
    },
    paymentId,
    amount,
    enrolledAt: new Date().toISOString(),
  });
}
