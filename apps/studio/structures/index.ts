import { StructureBuilder } from "sanity/structure";
import { lmsStructures } from "./lms/lms.structures";
import { redditStructures } from "./reddit/reddit.structures";
import { portfolioStructures } from "./portfolio/portfolio.structures";

export const structure = (S: StructureBuilder) =>
  S.list()
    .title("Studio ✧ Mr•LongRuồi")
    .items([
      lmsStructures(S), // OK vì đây là S.listItem()
      
      S.divider(),
      
      redditStructures(S),

      S.divider(),

      portfolioStructures(S),
    ]);
