import { Router } from "express";
import { getBitacora, getUser, login, register } from "../controllers/auth";
import { errorHandler } from "../error-handler";
import authMiddleware from "../middlewares/auth";
import { validate } from "../middlewares/validation";
import { RegisterSchema } from "../schemas/user-schema";
//import authCookie from "../middlewares/authCookie";
// import authCookie from "../middlewares/authCookie";

//usamos una ruta
const authRouter: Router = Router();

authRouter.post('/register',validate(RegisterSchema),errorHandler(register));
authRouter.post('/login',errorHandler(login));
authRouter.get("/me", [authMiddleware],errorHandler(getUser));
authRouter.get("/getBitacora",getBitacora)

export default authRouter;
