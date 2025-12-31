//capa de negocio, se encarga de conectar el modelo con la vista,
//  en este caso , las respuestas al clte. 
/*
Conecta la capa de datos con la vista.
En este caso las rutas.
*/
// Importamos el modelo
import modelo from './api.modelo.mjs';
// Se obtienen los invitados y se responde
async function obtenerInvitados(peticion, respuesta) {
// Cabeceras
respuesta.setHeader('content-type', 'application/json;charset=utf-8');
// Según se indicó, se necesita habilitar CORS
respuesta.setHeader('Access-Control-Allow-Origin', '*');
try {
// Modelo:
const datos = await modelo.obtenerInvitados();
// Dependiendo si hay o no datos:
if (datos.invitados.length > 0) {
respuesta.statusCode = 200;
// Se entrega un string con formato JSON
return respuesta.end(JSON.stringify(datos));
} else {
// No hay datos
respuesta.statusCode = 404;
return respuesta.end('{}');
}
} catch (error) {
// No hay datos
console.error(error);
return respuesta.end('{}');
}
}
// Se obtiene 1 invitado y se responde
async function obtenerInvitado(invitadoId, peticion, respuesta) {
// Cabeceras
respuesta.setHeader('content-type', 'application/json;charset=utf-8');
// Según se indicó, se necesita habilitar CORS
respuesta.setHeader('Access-Control-Allow-Origin', '*');
try {
// Modelo:
const datos = await modelo.obtenerInvitado(invitadoId);
// Dependiendo si hay o no datos:
if (datos.invitados.length > 0) {
respuesta.statusCode = 200;
// Se entrega un string con formato JSON
return respuesta.end(JSON.stringify(datos));
} else {
respuesta.statusCode = 404;
return respuesta.end('{}');
}
} catch (error) {
// No hay datos
console.error(error);
return respuesta.end('{}');
}
}
// Se agrega 1 invitado y se responde
async function agregarInvitado(peticion, respuesta) {
  try {
    await modelo.agregarInvitado();
    respuesta.statusCode = 201;
    return respuesta.end();
  } catch (error) {
    console.error(error);
    respuesta.statusCode = 500;
    return respuesta.end();
  }
}
// Se modifica 1 invitado y se responde
async function modificarInvitado(invitadoId, peticion, respuesta) {
// Se obtienen los datos desde el cuerpo de la petición
let datosInvitado = '';
peticion.on('data', (flujo) => {
datosInvitado += flujo;
});
peticion.on('error', (error) => {
console.error(error);
respuesta.statusCode = 400;
return respuesta.end();
});
peticion.on('end', async () => {
// Si llegaron los datos
try {
// Parseamos los datos ingresados
const invitado = JSON.parse(datosInvitado);
// Modelo: enviamos los datos
const modificado = await modelo.modificarInvitado(
invitadoId,
invitado,
);
// Respondemos
if (modificado) {
respuesta.statusCode = 200;
return respuesta.end();
} else {
respuesta.statusCode = 404;
return respuesta.end();
}
} catch (error) {
console.error(error);
return respuesta.end();
}
});
}
// Se elimina 1 invitado y se responde
async function eliminarInvitado(invitadoId, peticion, respuesta) {
try {
// Modelo:
const eliminado = await modelo.eliminarInvitado(invitadoId);
// Respondemos
if (eliminado) {
respuesta.statusCode = 200;
return respuesta.end();
} else {
respuesta.statusCode = 404;
return respuesta.end();
}
} catch (error) {
console.error(error);
respuesta.statusCode = 500;
return respuesta.end();
}
}
function noEncontrado(peticion, respuesta) {
respuesta.statusCode = 404;
return respuesta.end('{}');
}
// Exportamos
export default {
obtenerInvitados,
obtenerInvitado,
agregarInvitado,
modificarInvitado,
eliminarInvitado,
noEncontrado,
};
