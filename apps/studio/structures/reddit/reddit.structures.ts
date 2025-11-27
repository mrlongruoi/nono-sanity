import React from "react";
import { Flag } from "lucide-react";
import type { StructureBuilder } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const redditStructures = (S: StructureBuilder) =>
  S.listItem()
    .title("Reddit")
    .child(
      S.list()
        .title("Reddit Content")
        .items([
          ...S.documentTypeListItems().filter(
            (item) =>
              item.getId() &&
              ["post", "comment", "subreddit", "user", "vote"].includes(
                item.getId()!
              )
          ),
          S.divider(),
          // add reported section
          S.listItem()
            .title("Reported")
            .icon(() => React.createElement(Flag, { color: "red" }))
            .child(
              S.list()
                .title("Reported Content to be reviewed")
                .items([
                  S.listItem()
                    .title("Posts")
                    .child(
                      S.documentTypeList("post")
                        .title("Reported Posts")
                        .filter('_type == "post" && isReported == true')
                    ),
                  S.listItem()
                    .title("Comments")
                    .child(
                      S.documentTypeList("comment")
                        .title("Reported Comments")
                        .filter('_type == "comment" && isReported == true')
                    ),
                  S.listItem()
                    .title("Users")
                    .child(
                      S.documentTypeList("user")
                        .title("Reported Users")
                        .filter('_type == "user" && isReported == true')
                        .child((userId) =>
                          S.document()
                            .schemaType("user")
                            .documentId(userId)
                        )
                    ),
                ])
            ),
        ])
    );