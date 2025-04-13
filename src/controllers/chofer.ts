import { Request, Response, NextFunction } from "express";
import { FoundException } from "../exceptions/found";
import { prismaClient } from "..";
import {
  captureIpUser,
  createBitacoraUser,
  findRolByName,
  generarUsername,
} from "./auth";
import { Roles, TipoSesion } from "../exceptions/root";
import { NotFoundException } from "../exceptions/not-found";
import { hashSync } from "bcrypt";
import { BitacoraUser } from "../services/interfaces/bitacora-user";
import { usuarioObserver } from "../services/bitacora-observer";

export const registrarChofer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // capturamos los datos que vienen del request

  const { email, nombre, password, ci, direccion,estado,url_profile } = req.body;

  let usuario = await prismaClient.usuario.findUnique({
    where: { email },
  });

  if (usuario) {
    throw new FoundException("Error..Cliente ya esta registrado en el sistema");
  }
  //si no existe entonces lo creamos

  //primero buscamos el rol por defecto
  const rol = await findRolByName(Roles.CHOFER);

  if (!rol) {
    throw new NotFoundException("Error Rol No encontrado...");
  }
  //creamos el usuario
  console.log(req.body);
  usuario = await prismaClient.usuario.create({
    data: {
      nombre,
      email,
      username: generarUsername(nombre),
      rolId: rol.id,
      password: hashSync(password, 10),
      profile_icon: url_profile,
    },
   
  });

  const ipUsuario: string = captureIpUser(req);
  console.log(`ip del usuario: ${ipUsuario}`);

  const bitacoraUser: BitacoraUser = createBitacoraUser(
    usuario.id,
    usuario.nombre,
    ipUsuario,
    TipoSesion.REGISTRO_SESION
  );

  const chofer = await prismaClient.chofer.create({
    data: {
      ci,
      direccion,
      estado: estado == "DISPONIBLE"? "D":"N",
      usuarioId: usuario.id,
    },include:{
      usuario:true
    }
  });
  //registramos el registro de usuario en la bitacora
  usuarioObserver.emit("registrarABitacoraDeUsuario", bitacoraUser);

  
  const { password: __, ...usuarioSinPassword } = chofer.usuario;

  const choferConUsuarioLimpio = {
    ...chofer,
    usuario: usuarioSinPassword,
  };

  res.json(choferConUsuarioLimpio);
};
