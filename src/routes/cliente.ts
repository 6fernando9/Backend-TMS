import { Router } from "express";
import { errorHandler } from "../error-handler";
//import authMiddleware from "../middlewares/auth";
import { registrarCliente } from "../controllers/cliente";
import { validate } from "../middlewares/validation";
import { ClienteRegisterSchema } from "../schemas/cliente-schema";
//import authCookie from "../middlewares/authCookie";

const clienteRouter : Router = Router();

clienteRouter.post('/registrar',validate(ClienteRegisterSchema),errorHandler(registrarCliente));

export default clienteRouter;