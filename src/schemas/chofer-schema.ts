import { z } from "zod";

export const ChoferRegisterSchema = z.object({
  nombre: z.string().min(1, "Nombre requerido"),
  email: z.string().email("Correo inválido"),
  password: z.string().min(4, "Contraseña mínima de 6 caracteres"),
  direccion: z.string().min(1,"direccion Requerida"),
  estado: z.string().min(1,"estado requerido"),
  ci:z.string().min(4,"ci requerida")
}).strict();


export const ChoferUpdateSchema = z
  .object({
    nombre: z.string().min(1, "Nombre requerido"),
    email: z.string().email("Correo inválido"),
    username: z.string().min(1, "username requerido"),
    // password: z.string().min(4, "Contraseña mínima de 6 caracteres"),
    direccion: z.string().min(1, "direccion Requerida"),
    ci: z.string().min(4, "ci requerida"),
  })
  .strict();
