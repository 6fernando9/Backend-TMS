import { NextFunction, Request, Response } from "express";
import * as jwt from 'jsonwebtoken'
import { JWT_SECRET_KEY } from "../secrets";
import { prismaClient } from "..";
import { UnauthorizedException } from "../exceptions/unauthorized";
import { BadRequestException } from "../exceptions/bad-request";
import { NotFoundException } from "../exceptions/not-found";



//middleware para ver si el usuario tiene un jwt valido
///esto podria modificarse
const authMiddleware = async (req: Request,res: Response, next: NextFunction) => {
    //primero extraemos el token del header
    const token = req.headers.authorization;

    //si el token no esta presente tiramos una exception
    if(!token){//crearemos una exception
        console.log('No tiene token')
        throw new UnauthorizedException("Unauthorized");
    }
    //si esta presente, entonces lo decodificaremos
    try {
        //extraemos el payload
        const payload = jwt.verify(token!,JWT_SECRET_KEY) as any;

        //obtendremos al usuario del jwt
        const usuarioDelJwt = await prismaClient.usuario.findFirst({
            where:{
                id: payload.sub
            },include:{
                rol:true
            }
        })

        if(!usuarioDelJwt){
            throw new NotFoundException("Error Usuario No Encontrado..");
        }
        //lo agregamos a los request para poder usarlo donde sea
        req.usuario = usuarioDelJwt
        
        next()

    } catch (error) {
        next(new UnauthorizedException("Unauthorized"))

    }
}
export default authMiddleware;