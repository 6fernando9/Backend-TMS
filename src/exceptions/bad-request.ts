import { HttpException } from "./root";

export class BadRequestException extends HttpException{
    constructor(mensaje: string){
        super(mensaje,400,null);
    }
}