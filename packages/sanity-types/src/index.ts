export * from "./generated";

// Shared image upload type for Reddit and other apps
export type ImageUploadData = {
  base64: string;
  filename: string;
  contentType: string;
};
