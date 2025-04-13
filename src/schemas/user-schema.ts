import {z} from 'zod'

//estructura de un Schema, para validaciones
export const RegisterSchema = z.object({
  nombre: z.string().min(1, "Nombre requerido"),
  email: z.string().email("Correo inválido"),
  password: z.string().min(4, "Contraseña mínima de 6 caracteres"),
}).strict();

export const UpdateUserSchema = z.object({
    nombre: z.string(),
    email: z.string().email(),
    // password: z.string(),
    rol_id: z.string(),
    username: z.string()
}).strict()
