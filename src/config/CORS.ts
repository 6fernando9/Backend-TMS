import cors from 'cors';

export const corsOptions = {
    origin: "http://localhost:5173", //restrinjimos el acceso, solo a esta direccion
    methods: ["GET","POST","PUT","DELETE"], //definimos los metodos que estan permitidos
    allowedHeaders: ["Content-Type","Authorization"], //especifica las cabeceras permitidas
    //credentials : true
}

export const corsMiddleware = cors(corsOptions);