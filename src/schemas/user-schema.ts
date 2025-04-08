import {z} from 'zod'

//estructura de un Schema, para validaciones
export const RegisterSchema = z.object({
    nombre: z.string(),
    email: z.string().email(),
    password: z.string()
})

export const UpdateUserSchema = z.object({
    nombre: z.string(),
    email: z.string().email(),
    password: z.string(),
    rol_id: z.string(),
})
