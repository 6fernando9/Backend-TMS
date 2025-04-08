import { Router } from "express";
import rolRouter from "./rol-router";
import authRouter from "./auth";
import permisoRouter from "./permisos-router";
import usuarioRooter from "./usuario-router";

const rootRouter: Router = Router();

//aqui definimos las rutas basicas


rootRouter.use('/rol',rolRouter);
rootRouter.use('/auth',authRouter);
rootRouter.use('/permisos',permisoRouter);

rootRouter.use('/usuarios',usuarioRooter);

export default rootRouter;