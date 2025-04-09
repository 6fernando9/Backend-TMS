import { NextFunction, Request, Response } from "express";
import { prismaClient } from "..";
import { UpdateUserSchema } from "../schemas/user-schema";
import { BadRequestException } from "../exceptions/bad-request";
import { compare, hashSync } from "bcrypt";
import { NotFoundException } from "../exceptions/not-found";

export const UpdateAuthenticatedUser = async (req: Request, res: Response,next: NextFunction) => {
    try {
        console.log(req.body)
        const validatedData = UpdateUserSchema.parse(req.body);
    } catch (error) {
        throw new BadRequestException("Error datos no validos..");
    }
    const { nombre, email, password, rol_id } = req.body;
    console.log(nombre,email)
    //verificamos si la contra cambio
    const passwordMatch = await compare(password, req.usuario!.password);
    if (!passwordMatch) {
        console.log('la contra del usuario a cambiado')

    }else{
        console.log("la contra del usuario a se mantuvo");
    }
    const rol_idNumerico = Number(rol_id);
    //verificamos si el nuevo rol
    const rol = await prismaClient.rol.findUnique({
        where:{
            id: rol_idNumerico
        }
    });
    if(!rol){
        throw new NotFoundException("Error..Rol no encontrado...");
    }
    const usuarioActualizado = await prismaClient.usuario.update({
        where:{
            id: req.usuario?.id
        },
        data:{
            nombre,
            email,
            password: !passwordMatch ? hashSync(password, 10): req.usuario!.password,
            rol_id: rol.id
        },include:{
            rol:true
        }
    })
    const { password: __, ...usuarioSinPassword } = usuarioActualizado;
    res.json(usuarioSinPassword);
}

export const GetDataAuthenticatedUser = async (req: Request, res: Response, next: NextFunction) => {
    return await prismaClient.usuario.findFirst({
        where:{
            id: req.usuario?.id
        }
    })
    
}