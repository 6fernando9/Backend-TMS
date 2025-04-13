import { Router } from "express";
import { getAllUsersByRolId, UpdateAuthenticatedUser, updatePassword } from "../controllers/usuario";
import { errorHandler } from "../error-handler";
import authMiddleware from "../middlewares/auth";
import { validate } from "../middlewares/validation";
import { PasswordRequest } from "../schemas/passwordDTO";
//import authCookie from "../middlewares/authCookie";

const usuarioRooter : Router = Router();

usuarioRooter.put('/update',[authMiddleware],errorHandler(UpdateAuthenticatedUser));
usuarioRooter.put('/update-password',[errorHandler(authMiddleware)],validate(PasswordRequest),errorHandler(updatePassword));
usuarioRooter.get("/get/:id/rol", errorHandler(getAllUsersByRolId));
export default usuarioRooter;