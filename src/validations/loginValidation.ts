import { z } from "zod"

export default z.object({
  email: z.string().email().min(2, {
    message: "invalid email",
  }),
  password: z.string().min(8, {
    message: "password is too short",
  }),
  rememberMe: z.boolean().default(false),
})
