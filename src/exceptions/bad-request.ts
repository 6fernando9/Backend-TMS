import { HttpException } from "./root";

export class BadRequestException extends HttpException{
    constructor(mensaje: string,errores?:any){
        super(mensaje,400,null);
    }
}