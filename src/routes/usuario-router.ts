import { Router } from "express";
import { UpdateAuthenticatedUser } from "../controllers/usuario";
import { errorHandler } from "../error-handler";
import authMiddleware from "../middlewares/auth";
//import authCookie from "../middlewares/authCookie";

const usuarioRooter : Router = Router();

usuarioRooter.put('/update',[authMiddleware],errorHandler(UpdateAuthenticatedUser));

export default usuarioRooter;