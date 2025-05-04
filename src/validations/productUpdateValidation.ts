import { z } from "zod";
const fileTypeValidation = (file: File | string) => {
  if (typeof file === "string") return true; // Assuming URLs (strings) are always valid
  return file.type === "image/jpeg" || file.type === "video/mp4";
};
export default z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  brand: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  category: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  search: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  stock: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  price: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  discount: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }).optional().default("0%"),
  description: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  media: z
    .array(z.union([z.instanceof(File), z.string()]))
    .refine(files => files.every(fileTypeValidation), {
      message: "Only JPG and MP4 files are allowed.",
    })
    .optional(),
})