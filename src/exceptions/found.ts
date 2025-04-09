import {HttpException } from "./root";

export class FoundException extends HttpException{
    constructor(message: string ){
        super(message,400,null);
    }
}