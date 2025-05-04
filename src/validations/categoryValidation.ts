import { z } from "zod"
export default z.object({
  name: z.string().min(2, {
    message: "invalid category name",
  }),
  parentId: z
    .string()
    .min(4, {
      message: "Username must be at least 2 characters.",
    })
    .optional(),
  search: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .optional(),
})
