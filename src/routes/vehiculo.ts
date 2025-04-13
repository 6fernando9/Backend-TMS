import { Router } from "express";
import { registrarVehiculo,getTipoVehiculo,getVehiculo, createTipoVehiculo } from "../controllers/Vehiculo";
import { errorHandler } from "../error-handler";
import authMiddleware from "../middlewares/auth";



//usamos una ruta
const vehRouter: Router = Router();

vehRouter.post('/registrar',errorHandler(registrarVehiculo));
vehRouter.get('/get-all-tipo-vehiculo/',errorHandler(getTipoVehiculo));
vehRouter.get("/get-all", errorHandler(getVehiculo));
vehRouter.post("/create-tipo", errorHandler(createTipoVehiculo));

export default vehRouter;