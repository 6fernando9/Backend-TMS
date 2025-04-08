
import { Usuario } from "@prisma/client"
import { Request } from "express";
declare module "express"{
    export interface Request {
        //export interface Request  {
            usuario ?: Usuario;
        //}
    }
}

//agregar comentario
//estuvo bueno
