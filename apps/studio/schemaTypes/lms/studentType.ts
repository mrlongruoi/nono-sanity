import { defineField, defineType } from "sanity";
import React from "react";

export default defineType({
  name: "student",
  title: "Student",
  type: "document",
  fields: [
    defineField({
      name: "firstName",
      title: "First Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "lastName",
      title: "Last Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "clerkId",
      title: "Clerk User ID",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "imageUrl",
      title: "Profile Image URL",
      type: "url",
    }),
  ],

  preview: {
    select: {
      firstName: "firstName",
      lastName: "lastName",
      imageUrl: "imageUrl",
    },
    prepare({ firstName, lastName, imageUrl }) {
      const fullName = `${firstName?.[0]?.toUpperCase() || ""}${firstName?.slice(1) || ""} ${
        lastName?.[0]?.toUpperCase() || ""
      }${lastName?.slice(1) || ""}`;

      const media =
        imageUrl
          ? React.createElement("img", {
              src: imageUrl,
              width: 100,
              height: 100,
              alt: fullName,
              style: {
                objectFit: "cover",
                borderRadius: "50%",
                width: "60px",
                height: "60px",
              },
            })
          : undefined;

      return {
        title: fullName,
        media,
      };
    },
  },
});
