import { z } from "zod";

export const ClienteRegisterSchema = z.object({
  nombre: z.string().min(1, "Nombre requerido"),
  email: z.string().email("Correo inválido"),
  password: z.string().min(4, "Contraseña mínima de 6 caracteres"),
  fecha_nacimiento: z.string().min(1,"Fecha Requerida"),
  telefono: z.string().min(1,"Telefono requerido"),
  direccion:z.string().min(1,"direccion requerida")
}).strict();



export const ClienteUpdateSchema = z
  .object({
    nombre: z.string().min(1, "Nombre requerido"),
    email: z.string().email("Correo inválido"),
    username: z.string().min(1, "username requerido"),
    fecha_nacimiento: z.string().min(1, "Fecha Requerida"),
    telefono: z.string().min(1, "Telefono requerido"),
    direccion: z.string().min(1, "direccion requerida"),
  })
  .strict();
