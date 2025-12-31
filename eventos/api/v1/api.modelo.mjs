//capa de datos , se encarga de gestionar los datos  

//Responsable de la capa de datos.

// importamos los módulos necesarios
import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';
// Archivo de configuración
import config from './api.config.mjs';
// Ruta archivo JSON
const rutaArchivo = join(config.archivo);
// Leer el archivo JSON
async function leerArchivo(ruta) {
  try {
    // Se lee el JSON
    const datos = await readFile(ruta, 'utf-8');
    // Retorna un objeto
    return JSON.parse(datos);
  } catch (error) {
    // Emitimos una excepción
    throw error;
  }
}
// Escribir el archivo JSON
async function escribirArchivo(ruta, datos) {
  try {
    // Escribimos el archivo
    return await writeFile(ruta, JSON.stringify(datos, null, 2));
  } catch (error) {
    // Emitimos una excepción
    throw error;
  }
}
// Obtener todos los invitados
async function obtenerInvitados() {
  return await leerArchivo(rutaArchivo);
}
// Se obtiene 1 invitado por su ID
async function obtenerInvitado(invitadoId) {
  try {
    const datos = await leerArchivo(rutaArchivo);
    return { invitados: datos.invitados.filter(inv => parseInt(inv.invitadoId) === parseInt(invitadoId)) };
  } catch (error) {
    throw error;
  }
}
// Agregar un nuevo invitado
async function agregarInvitado() {
  let datos = await leerArchivo(rutaArchivo);
  if (!Array.isArray(datos.invitados)) {
    datos.invitados = [];
  }
  const nuevoId = datos.invitados.length > 0 ? Math.max(...datos.invitados.map(i => i.invitadoId)) + 1 : 1;
  const { nombre, apellido } = generarNombreApellidoUnico(datos.invitados);
  const nuevoInvitado = { invitadoId: nuevoId, nombre, apellido };
  datos.invitados.push(nuevoInvitado);
  await escribirArchivo(rutaArchivo, datos);
}
// Modificar un invitado existente
async function modificarInvitado(invitadoId, datosInvitado) {
  try {
    let datos = await leerArchivo(rutaArchivo);
    let modificado = false;
    datos.invitados = datos.invitados.map(inv => {
      if (parseInt(inv.invitadoId) === parseInt(invitadoId)) {
        modificado = true;
        return { ...inv, ...datosInvitado };
      }
      return inv;
    });
    if (modificado) {
      await escribirArchivo(rutaArchivo, datos);
      return true;
    }
    return false;
  } catch (error) {
    throw error;
  }
}
// Eliminar un invitado
async function eliminarInvitado(invitadoId) {
  try {
    let datos = await leerArchivo(rutaArchivo);
    const nuevosInvitados = datos.invitados.filter(inv => parseInt(inv.invitadoId) !== parseInt(invitadoId));
    if (nuevosInvitados.length < datos.invitados.length) {
      datos.invitados = nuevosInvitados;
      await escribirArchivo(rutaArchivo, datos);
      return true;
    }
    return false;
  } catch (error) {
    throw error;
  }
}

// Generador de nombre y apellido latino único
const nombresLatinos = [
  "Juan", "Ana", "Luis", "María", "Carlos", "Lucía", "Pedro", "Sofía", "Miguel", "Valentina",
  "Javier", "Camila", "Andrés", "Paula", "Diego", "Gabriela", "Mateo", "Fernanda", "Santiago", "Carolina"
];
const apellidosLatinos = [
  "Pérez", "García", "Rodríguez", "López", "Martínez", "Gómez", "Díaz", "Sánchez", "Romero", "Torres",
  "Alvarez", "Ruiz", "Ramírez", "Flores", "Acosta", "Silva", "Castro", "Ortiz", "Molina", "Rojas"
];
function generarNombreApellidoUnico(invitados) {
  let nombre, apellido, existe;
  do {
    nombre = nombresLatinos[Math.floor(Math.random() * nombresLatinos.length)];
    apellido = apellidosLatinos[Math.floor(Math.random() * apellidosLatinos.length)];
    existe = invitados.some(inv => inv.nombre === nombre && inv.apellido === apellido);
  } while (existe);
  return { nombre, apellido };
}

// Exportamos las funcionalidades
export default {
  obtenerInvitados,
  obtenerInvitado,
  agregarInvitado,
  modificarInvitado,
  eliminarInvitado,
};
