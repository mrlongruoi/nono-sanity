import React from "react";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "enrollment",
  title: "Enrollment",
  type: "document",
  fields: [
    defineField({
      name: "student",
      title: "Student",
      type: "reference",
      to: [{ type: "student" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "course",
      title: "Course",
      type: "reference",
      to: [{ type: "course" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "amount",
      title: "Amount",
      type: "number",
      validation: (rule) => rule.required().min(0),
      description: "The amount paid for the course enrollment in USD (dollars)",
    }),
    defineField({
      name: "paymentId",
      title: "Payment ID",
      type: "string",
      validation: (rule) => rule.required(),
      description: "The Stripe payment/checkout session ID",
    }),
    defineField({
      name: "enrolledAt",
      title: "Enrolled At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
  ],

  preview: {
    select: {
      courseTitle: "course.title",
      studentFirstName: "student.firstName",
      studentLastName: "student.lastName",
      studentImage: "student.imageUrl",
    },
    prepare({ courseTitle, studentFirstName, studentLastName, studentImage }) {
      return {
        title: `${studentFirstName ?? ""} ${studentLastName ?? ""}`,
        subtitle: courseTitle ?? "Course Enrollment",
        media: studentImage
          ? React.createElement("img", {
              src: studentImage,
              width: 100,
              height: 100,
              style: { objectFit: "cover", borderRadius: "50%" },
            })
          : undefined,
      };
    },
  },
});
