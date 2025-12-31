//punto de entrada de la app
import { createServer } from 'http';
// Importamos rutasAPI con el nombre "rutasAPI_V1"
import rutasAPI_V1 from './api/v1/api.rutas.mjs';
const PUERTO = 3000;
// Servidor
const api = createServer((peticion, respuesta)=>{
// Gestion rutas V1
rutasAPI_V1(peticion, respuesta);
});
api.listen(PUERTO);