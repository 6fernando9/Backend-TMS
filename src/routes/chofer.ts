import { Router } from "express";
import { errorHandler } from "../error-handler";
//import authMiddleware from "../middlewares/auth";
import { registrarCliente } from "../controllers/cliente";
import { validate } from "../middlewares/validation";
import { ClienteRegisterSchema } from "../schemas/cliente-schema";
import { registrarChofer } from "../controllers/chofer";
import { ChoferRegisterSchema } from "../schemas/chofer-schema";
//import authCookie from "../middlewares/authCookie";

const choferRouter : Router = Router();

choferRouter.post('/registrar',validate(ChoferRegisterSchema),errorHandler(registrarChofer));

export default choferRouter;