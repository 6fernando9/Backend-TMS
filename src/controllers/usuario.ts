import { NextFunction, Request, Response } from "express";
import { prismaClient } from "..";
import { UpdateUserSchema } from "../schemas/user-schema";
import { BadRequestException } from "../exceptions/bad-request";
import { compare, hashSync } from "bcrypt";
import { NotFoundException } from "../exceptions/not-found";
import { UnauthorizedException } from "../exceptions/unauthorized";
import { ClienteUpdateSchema } from "../schemas/cliente-schema";
import { ChoferUpdateSchema } from "../schemas/chofer-schema";
import { Roles } from "../exceptions/root";
import { UsuarioDTOTabla } from "../services/usuarioService";




export const UpdateAuthenticatedUser = async (req: Request, res: Response,next: NextFunction) => {

    const usuarioAutenticado = req.usuario

    const usuario = await prismaClient.usuario.findFirst({
        where:{
            id:usuarioAutenticado?.id
        },
        include:{
            rol:true,
            cliente:true,
            chofer:true
        }
    })
    if (!usuario){
        throw new UnauthorizedException("Error..usuario no autenticado")
    }
    
     const { rol, cliente, chofer } = usuario;
     const body = req.body;
    if (rol.nombre == Roles.CLIENTE ){
        if (!ClienteUpdateSchema.safeParse(body).success){
            throw new BadRequestException("Error en la validacion de datos del cliente")
        }
        const { fecha_nacimiento,telefono,direccion } = body
        const clienteActualizado = await prismaClient.cliente.update({
            where:{id:cliente?.id},
            data:{
                fechaNacimiento:fecha_nacimiento,
                telefono,
                direccion,
            }
        })

    }else if (rol.nombre == Roles.CHOFER) {
        if (!ChoferUpdateSchema.safeParse(body).success) {
          throw new BadRequestException(
            "Error en la validacion de datos del chofer"
          );
        }

        const { ci,direccion } = body
        const choferActualizado = await prismaClient.chofer.update({
          where: { id: chofer?.id },
          data: {
            ci,
            direccion,
          },
        }); 
      
    }
    //usuario administrador o cualquier otro rol
    const {email , nombre, username} = req.body
    const usuarioActualizado = await prismaClient.usuario.update({
      where: { id: usuario.id },
      data: {
        email,
        nombre,
        username
      },
      include:{
        cliente:true,
        chofer:true
      },
    }); 
    const { password: _, ...usuarioSinContra } = usuarioActualizado;
    
    res.json({message:"Actualizacion con exito",
              usuario:usuarioSinContra
    });
}

export const GetDataAuthenticatedUser = async (req: Request, res: Response, next: NextFunction) => {
    return await prismaClient.usuario.findFirst({
        where:{
            id: req.usuario?.id
        }
    })
    
}

export const updatePassword = async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body
    const { anterior_password, nueva_password } = body
    if (!req.usuario){
        throw new UnauthorizedException("Error..Usuario no autenticado")
    }
    let usuario = req.usuario
    const password_db = usuario.password
     let passwordMatch = await compare(anterior_password, password_db);
    // si la contrasenia anterior no cuadra  con la nueva entonces no se puede hacer el cambio
     if (!passwordMatch) {
       throw new BadRequestException("Error contraseña Incorrecta");
     }
    passwordMatch = await compare(nueva_password, password_db);
    //si por si las moscas la nueva contrasenia es no es la misma entonces cambiamos
    if (!passwordMatch){
        usuario = await prismaClient.usuario.update({
          where: {
            id: usuario.id,
          },
          data: {
            password: hashSync(nueva_password, 10),
          },
        });
    }
    //si es la misma ,no se hace nada
    const { password: _, ...usuarioSinContra } = usuario;
    res.json({
      message: "Constrasenia actualizada con exito",
      usuario: usuarioSinContra,
    });

}

export const getAllUsersByRolId = async (req: Request, res: Response, next: NextFunction) => {
    const id = +req.params.id 
    const usuariosPorRol = await prismaClient.usuario.findMany({
        where:{
            rolId: id
        },include:{
            rol:true
        }
    })
    const usuarios = usuariosPorRol.map(UsuarioDTOTabla)
    res.json({       
        usuarios
    })
}
