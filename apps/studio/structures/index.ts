import { StructureBuilder } from "sanity/structure";
import { lmsStructures } from "./lms/lms.structures";

export const structure = (S: StructureBuilder) =>
  S.list()
    .title("Content")
    .items([
      lmsStructures(S), // OK vì đây là S.listItem()
    ]);
