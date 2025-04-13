import { NextFunction, Request, Response } from "express";
import {HttpException } from "./exceptions/root";
import { ZodError } from "zod";
import { BadRequestException } from "./exceptions/bad-request";
import { InternalException } from "./exceptions/internal-exception";

//funcion que recibe un callback es decir una funcion que retorna una promesa,
//  generalmente son todas las funciones utilizadas en el controlador

type AsyncHandler = ( req: Request,res: Response, next: NextFunction ) => Promise<void>;
export const errorHandler = (method: AsyncHandler) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await method(req,res,next);// se ejecuta el metodo de manera asincrona
        } catch (error: any) {
            //si ocurre un error lo captura
            let exception: HttpException;
            console.log(`log de error ${error}`)
            if(error instanceof HttpException){
                console.log(`me lanze en HttpException> ${error}`)
                exception = error;
            }else{
                if(error instanceof ZodError){
                    console.log(`me lanze en zod> ${error}`);
                    exception = new BadRequestException("No Se puede procesar la entidad");
                }else{
                    console.log(`me lanze en Interal> ${error}`);
                    exception = new InternalException("Algunas cosas salieron mal..",null);
                }
            }
            //se dirige al middleware de error donde genera el error
            next(exception);
        }
    }
}