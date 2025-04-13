import { z } from "zod";

export const PasswordRequest = z
  .object({
    anterior_password: z.string().min(1),
    nueva_password: z.string().min(1),
  })
  .strict();