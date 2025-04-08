import { Router } from "express";
import { getUser, login, register } from "../controllers/auth";
import { errorHandler } from "../error-handler";
import authMiddleware from "../middlewares/auth";
//import authCookie from "../middlewares/authCookie";
// import authCookie from "../middlewares/authCookie";

//usamos una ruta
const authRouter: Router = Router();

authRouter.post('/register',errorHandler(register));
authRouter.post('/login',errorHandler(login));
authRouter.get("/me", [authMiddleware],errorHandler(getUser));

export default authRouter;
