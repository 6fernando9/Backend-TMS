import cors from 'cors';

// export const corsOptions = {
//     origin: ["http://localhost:5173","https://funny-bienenstitch-b99ff6.netlify.app"], //restrinjimos el acceso, solo a esta direccion
//     methods: ["GET","POST","PUT","DELETE"], //definimos los metodos que estan permitidos
//     allowedHeaders: ["Content-Type","Authorization"], //especifica las cabeceras permitidas
// }

// export const corsMiddleware = cors(corsOptions);


const allowedOrigins = [
  "http://localhost:5173",
  "https://funny-bienenstitch-b99ff6.netlify.app",
];

export const corsOptions = {
  origin: function (origin:any, callback:any) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("No permitido por CORS"));
    }
  },
  credentials: true, // <<< ESTA ES LA CLAVE
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

export const corsMiddleware = cors(corsOptions);