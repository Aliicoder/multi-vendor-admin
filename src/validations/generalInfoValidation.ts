import { z } from "zod"

export default z.object({
  type: z.string().default("generalInformation"),
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  description: z
    .string()
    .min(10, {
      message: "description is too short",
    })
    .max(100, { message: "description is too long" }),
  media: z
    .instanceof(File)
    .refine(
      (file: File) => file.type === "image/jpeg" || file.type === "video/mp4",
      {
        message: "Only JPG and MP4 files are allowed.",
      }
    )
    .optional(),
})
