import express, { Express,request,response } from "express";
import { PORT } from "./secrets";
import { PrismaClient } from "@prisma/client";
import rootRouter from "./routes";
import { errorMiddleware } from "./middlewares/error";
import { corsMiddleware } from "./config/CORS";
//import cookieParser from "cookie-parser";
//importamos express
const app: Express = express();

app.use(corsMiddleware);

//para las cookies
//app.use(cookieParser());
//para las request que tengan un formato json
app.use(express.json());
//para el form-data
//app.use(express.urlencoded({ extended: true }));

//ruta principal clave
app.use('/api',rootRouter);

//usar el middleweare
app.use(errorMiddleware);

//para el proxy y capturar ip
// app.set("trust proxy", true); 

//instancia prismaClient que se utilizara en el controlador 
export const prismaClient = new PrismaClient({
    log: ["query"]
})
//esuchamos el puerto
app.listen(PORT,() =>{
    console.log(`app is running on http://localhost:${PORT}`);
})
