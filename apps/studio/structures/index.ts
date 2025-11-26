import { lmsStructures } from "./lms/lms.structures";

export const structure = (S: any) =>
  S.list()
    .title("Content")
    .items([
      lmsStructures(S),    // OK vì đây là S.listItem()
    ]);
