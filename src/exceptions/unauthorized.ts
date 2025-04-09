import {HttpException } from "./root";

export class UnauthorizedException extends HttpException{
    constructor(mensaje: string){
        super(mensaje,404,null);
    }
}