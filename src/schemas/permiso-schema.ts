import {z} from 'zod'

export const CreatePermissionSchema = z.object({
    nombre:z.string()
}).strict();

//XD
export const UpdatePermissionSchema = z.object({
   nombre: z.string(),
}).strict();