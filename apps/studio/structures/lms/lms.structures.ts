import { StructureBuilder } from "sanity/structure";

export const lmsStructures = (S: StructureBuilder) =>
  S.listItem()
    .title("LMS")
    .child(
      S.list()
        .title("Admin Dashboard")
        .items([
          // COURSE CONTENT
          S.listItem()
            .title("Course Content")
            .child(
              S.documentTypeList("course")
                .title("Courses")
                .child((courseId: string) => {
                  if (!courseId) return S.documentTypeList("course");

                  return S.list()
                    .title("Course Options")
                    .items([
                      S.listItem()
                        .title("Edit Course Content")
                        .child(
                          S.document().schemaType("course").documentId(courseId)
                        ),

                      S.listItem()
                        .title("View Students")
                        .child(
                          S.documentList()
                            .title("Course Enrollments")
                            .filter(
                              '_type == "enrollment" && course._ref == $courseId'
                            )
                            .params({ courseId })
                        ),
                    ]);
                })
            ),

          S.divider(),

          // USER MANAGEMENT
          S.listItem()
            .title("User Management")
            .child(
              S.list()
                .title("User Management")
                .items([
                  // Instructors
                  S.listItem()
                    .title("Instructors")
                    .child(
                      S.documentTypeList("instructor")
                        .title("Instructors")
                        .child((instructorId: string) => {
                          if (!instructorId)
                            return S.documentTypeList("instructor");

                          return S.list()
                            .title("Instructor Options")
                            .items([
                              S.listItem()
                                .title("Edit Instructor")
                                .child(
                                  S.document()
                                    .schemaType("instructor")
                                    .documentId(instructorId)
                                ),

                              S.listItem()
                                .title("View Courses")
                                .child(
                                  S.documentList()
                                    .title("Instructor's Courses")
                                    .filter(
                                      '_type == "course" && instructor._ref == $instructorId'
                                    )
                                    .params({ instructorId })
                                ),
                            ]);
                        })
                    ),

                  // Students
                  S.listItem()
                    .title("Students")
                    .child(
                      S.documentTypeList("student")
                        .title("Students")
                        .child((studentId: string) => {
                          if (!studentId)
                            return S.documentTypeList("student");

                          return S.list()
                            .title("Student Options")
                            .items([
                              S.listItem()
                                .title("Edit Student")
                                .child(
                                  S.document()
                                    .schemaType("student")
                                    .documentId(studentId)
                                ),

                              S.listItem()
                                .title("View Enrollments")
                                .child(
                                  S.documentList()
                                    .title("Student Enrollments")
                                    .filter(
                                      '_type == "enrollment" && student._ref == $studentId'
                                    )
                                    .params({ studentId })
                                ),

                              S.listItem()
                                .title("View Completed Lessons")
                                .child(
                                  S.documentList()
                                    .title("Completed Lessons")
                                    .schemaType("lessonCompletion")
                                    .filter(
                                      '_type == "lessonCompletion" && student._ref == $studentId'
                                    )
                                    .params({ studentId })
                                    .defaultOrdering([
                                      { field: "completedAt", direction: "desc" },
                                    ])
                                ),
                            ]);
                        })
                    ),
                ])
            ),

          S.divider(),

          // SYSTEM MANAGEMENT
          S.listItem()
            .title("System Management")
            .child(
              S.list()
                .title("System Management")
                .items([
                  S.documentTypeListItem("category").title("Categories"),
                ])
            ),
        ])
    );
