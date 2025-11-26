import { defineField, defineType } from "sanity";
import React from "react";
import { urlFor } from "@workspace/sanity-utils";

export default defineType({
  name: "lessonCompletion",
  title: "Lesson Completion",
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
      name: "lesson",
      title: "Lesson",
      type: "reference",
      to: [{ type: "lesson" }],
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "module",
      title: "Module",
      type: "reference",
      to: [{ type: "module" }],
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
      name: "completedAt",
      title: "Completed At",
      type: "datetime",
      validation: (rule) => rule.required(),
    }),
  ],

  preview: {
    select: {
      courseTitle: "course.title",
      lessonTitle: "lesson.title",
      completedAt: "completedAt",
      courseImage: "course.image", // phải là Sanity image type
    },

    prepare({ courseTitle, lessonTitle, completedAt, courseImage }) {
      const formattedDate = completedAt
        ? new Date(completedAt).toLocaleDateString()
        : "";

      const media =
        courseImage
          ? React.createElement("img", {
              src: urlFor(courseImage).width(100).height(100).url(),
              alt: courseTitle || "Course",
              style: { objectFit: "cover", width: "100px", height: "100px" },
            })
          : undefined;

      return {
        title: `${courseTitle || "Course"} — ${lessonTitle || "Lesson"}`,
        subtitle: formattedDate,
        media,
      };
    },
  },
});
