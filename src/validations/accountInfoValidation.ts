import { z } from "zod";

export default z.object({
  type:z.string().default("accountInformation"),
  email: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  status: z.enum(["active", "inactive"],{
    message:"Status must be active or inactive.",
  }),
  payment: z.enum(["pending","fulfilled"],{
    message:"Status must be pending or fulfilled.",
  }),
  subscription: z.enum(["standard","premium"],{
    message:"Status must be standard or premium.",
  }),

})