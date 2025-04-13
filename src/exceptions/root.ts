export class HttpException extends Error {
  message: string;
  
  statusCode: number;

//recibe el mensaje o descripcion del error
//recibe el codigo de error interno, como error personalizado
//recibe el codigo HTTP de respuesta
//detalles adicionales del error
  constructor(message: string, statusCode: number, errores: any) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
    
  }
}
export enum Roles{
    ADMIN= "ADMIN",USUARIO = "USUARIO",TRABAJADOR = "TRABAJADOR"
}

export enum TipoSesion{
    INICIO_SESION = "I",
    CIERRE_SESION = "C",
    REGISTRO_SESION = "R"

}