import { compare, hashSync } from "bcrypt";
import { prismaClient } from "..";
import { NextFunction, Request, Response } from "express";
import { JWT_SECRET_KEY } from "../secrets";
import * as jwt from 'jsonwebtoken'
import { NotFoundException } from "../exceptions/not-found";
import { Roles, TipoSesion } from "../exceptions/root";
import { BadRequestException } from "../exceptions/bad-request";
import { FoundException } from "../exceptions/found";
import { usuarioObserver } from "../services/bitacora-observer";
import { UnauthorizedException } from "../exceptions/unauthorized";
import { BitacoraUser } from "../services/interfaces/bitacora-user";
import { RegisterSchema } from "../schemas/user-schema";



//metodo de login
export const login = async (req: Request, res: Response) => {
  //destructuramos los datos
  const { email, password } = req.body;
  //lo buscamos al usuario por email
  let usuario = await prismaClient.usuario.findUnique({ 
    where: { email },
    include:{rol: true}
  });
  if (!usuario) {
    throw new NotFoundException(
      "Error Usuario No encontrado.."
    );
  }
  //comparamos contrasenias
  const passwordMatch = await compare(password, usuario.password);
  if (!passwordMatch) {
    throw new BadRequestException(
      "Error contraseña Incorrecta"
    );
  }

  //si todo esta correcto entonces creamos el jwt con la firma
  //aca podriamos meter los roles
  const token = jwt.sign(
    {
      sub: usuario.id,
      //faltaria roles y permisos guardarlo
    },
    JWT_SECRET_KEY,
    {
      algorithm: "HS256",
      expiresIn: "1h",
    }
  );

  const ipUsuario: string = captureIpUser(req);
  console.log(`ip del usuario: ${ipUsuario}`);

  const bitacoraUser: BitacoraUser = createBitacoraUser(
    usuario.id,
    usuario.nombre,
    ipUsuario,
    TipoSesion.INICIO_SESION
  );
  //registramos el Inicio de sesion del usuario
  usuarioObserver.emit("registrarABitacoraDeUsuario", bitacoraUser);

  //para la cookie
  // Configurar la cookie segura
  // res.cookie("token", token, {
  //   httpOnly: true, // 🔹 Evita que JavaScript acceda a la cookie (protege contra XSS)
  //  // secure: true, // 🔹 Solo se envía en HTTPS (¡desactiva esto en localhost si es necesario!)
  //   sameSite: "strict", // 🔹 Previene ataques CSRF
  //   maxAge: 60 * 60 * 1000, // 1 hora de duración
  // });

  //le quitamos la contrasenia al usuario
  const { password: _, ...usuarioSinContra } = usuario;

  res.json({
    message: `Bienvenido usuario ${usuarioSinContra.nombre}`,
    usuario: usuarioSinContra,
    token,
  }); //devolvemos un json conformado por 2 objetos
};

//metodo de registro de usuarios
export const register = async (req: Request, res: Response,next: NextFunction) => {
  // capturamos los datos que vienen del request

  const { email, nombre, password } = req.body;
  let usuario = await prismaClient.usuario.findUnique({
    where: { email },
  });

  
  if (usuario) {
    throw new FoundException(
        "Error..usuario ya esta registrado en el sistema")
  }
  //si no existe entonces lo creamos



  //primero buscamos el rol por defecto
  const rol = await findRolByName(Roles.USUARIO);

  if (!rol) {
      throw new NotFoundException(
        "Error Rol No encontrado...",
      )
    
  }
  //creamos el usuario
  console.log(req.body)
  usuario = await prismaClient.usuario.create({
    data: {
      nombre,
      email,
      username: generarUsername(nombre),
      rolId: rol.id,
      password: hashSync(password, 10),
    },
  });
  const ipUsuario: string = captureIpUser(req);
  console.log(`ip del usuario: ${ipUsuario}`)

  const bitacoraUser: BitacoraUser = createBitacoraUser(usuario.id,usuario.nombre,ipUsuario,TipoSesion.REGISTRO_SESION);
  //registramos el registro de usuario en la bitacora
  usuarioObserver.emit("registrarABitacoraDeUsuario", bitacoraUser);

  //destructuramos para que retorne un objeto sin contrasenia
  const { password: __, ...usuarioSinPassword } = usuario;

  res.json(usuarioSinPassword);
}


export function generarUsername(nombre: string): string {
  const primerNombre = nombre.trim().split(" ")[0]; 
  return (
    primerNombre.charAt(0).toUpperCase() + primerNombre.slice(1).toLowerCase()
  );
}

//metodo para obtener el usuario de la cookie?
export const getUser = async (req: Request,res: Response,next: NextFunction) => {
  const { password: __, ...usuarioSinPassword } = req.usuario!;
  res.json(usuarioSinPassword);
}

//no hay cookie
// export const logout = (req: Request, res: Response) => {
//   res.clearCookie("token", {
//     httpOnly: true,
//     secure: true,
//     sameSite: "strict",
//   });
//   res.json({ message: "Sesión cerrada correctamente" });
// };


export const findRolByName = async (nombre: string) => {
  
  const rol = await prismaClient.rol.findFirst({
    where:{
      nombre
    }
  });
  return rol;
} 

export const captureIpUser = (req: Request): string => {
  let ipUsuario = req.ip;
  console.log(`req.ip: ${req.ip}`);
  // 📌 Si hay un proxy, tomar la IP real del usuario
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string") {
    ipUsuario = forwarded.split(",")[0]; // Extraer la primera IP real
  }
  if(!ipUsuario){
    throw new UnauthorizedException("Error Usuario Sin Ip");
  }
  return ipUsuario;
}

export const createBitacoraUser = (usuarioId: number, nombre: string, ip: string, tipo_sesion: string): BitacoraUser => {
    const bitacoraUser: BitacoraUser = {
      usuarioId,nombre,ip,tipo_sesion
    }
    return bitacoraUser;
}


export const getBitacora= async (req:Request,res:Response)=>{
  try {
    const registroBitacora= await prismaClient.bitacora_usuario.findMany();
    const bitacoraMap = await Promise.all(
      registroBitacora.map(async (r) => {
        const usuario = await prismaClient.usuario.findUnique({
          where: { id: r.usuarioId },
          select: { email: true }, // Solo selecciona el campo que necesitas
        });

        return {
          id: r.id,
          id_usuario: r.usuarioId,
          ip: r.ip,
          correo: usuario?.email || "No encontrado",
          nombre: r.username,
          fecha: r.createdAt,
          hora: r.updatedAt,
        };
      })
    );
    res.status(200).json(bitacoraMap)
  } catch (error) {
    res.status(500).json({error})
  }

}