import {  HttpException } from "./root";

export class NotFoundException extends HttpException{
    constructor(mensaje: string ){
        super(mensaje,404,null);
    }
}