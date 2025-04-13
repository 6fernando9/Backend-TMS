import { Router } from "express";
import rolRouter from "./rol-router";
import authRouter from "./auth";
import permisoRouter from "./permisos-router";
import usuarioRooter from "./usuario-router";
import clienteRouter from "./cliente";
import choferRouter from "./chofer";

const rootRouter: Router = Router();

//aqui definimos las rutas basicas


rootRouter.use('/rol',rolRouter);
rootRouter.use('/auth',authRouter);
rootRouter.use('/permisos',permisoRouter);
rootRouter.use('/cliente',clienteRouter)
rootRouter.use("/chofer", choferRouter);
rootRouter.use('/usuarios',usuarioRooter);

export default rootRouter;