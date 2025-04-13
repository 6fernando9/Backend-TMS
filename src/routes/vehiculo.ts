import { Router } from "express";
import { registrarVehiculo,getTipoVehiculo,getVehiculo } from "../controllers/Vehiculo";
import { errorHandler } from "../error-handler";
import authMiddleware from "../middlewares/auth";



//usamos una ruta
const vehRouter: Router = Router();

vehRouter.post('/regVehiculo',registrarVehiculo);
vehRouter.get('/getTipo',getTipoVehiculo);
vehRouter.get("/getVehi", getVehiculo);

export default vehRouter;