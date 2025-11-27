import { defineEnableDraftMode } from "next-sanity/draft-mode";
import { client } from "@workspace/sanity-utils";

export const { GET } = defineEnableDraftMode({
  client: client.withConfig({
    token: process.env.SANITY_VIEWER_TOKEN,
  }),
});
