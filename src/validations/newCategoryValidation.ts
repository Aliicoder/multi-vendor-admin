import { z } from "zod";
export default  z.object({
  categoryName: z.string().min(2, {
    message: "invalid category name",
  }),
  categoryDescription: z.string().min(8, {
    message: "password is too short",
  }),
  category: z.string().min(2, {
    message: "Us must be at least 2 characters.",
  }).optional(),
  parentCategory: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }).optional().default("root"),
  search: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }).optional(),
  media:z
  .instanceof(File)
  .refine(file => {
    return file.type === "image/jpeg" || file.type === "image/jpg";
  }, "Only jpg/jpeg files are allowed")
})

export const defaultValues = {
  email: "",
  password: ""
}