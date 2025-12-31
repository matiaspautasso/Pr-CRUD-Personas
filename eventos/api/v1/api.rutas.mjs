//se encarga del enrutado de las peticiones. 

/*
se encarga de las rutas
*/
// Importamos el controlador
import controlador from './api.controlador.mjs';
// Importamos la configuración
import config from './api.config.mjs';

async function rutasAPI(peticion, respuesta) {
	const { method, url } = peticion;
	// Verificamos la ruta base
	if (url.startsWith(config.base)) {
		// GET todos los invitados
		if (url === config.base && method === 'GET') {
			return await controlador.obtenerInvitados(peticion, respuesta);
		}
		// GET un invitado por ID
		else if (url.startsWith(config.base) && method === 'GET') {
			const invitadoId = url.replace(config.base + '/', '');
			// const invitadoId = url.match(/^\/api\/v1\/invitados\/(.+)?$/i)[1];
			return await controlador.obtenerInvitado(
				parseInt(invitadoId),
				peticion,
				respuesta,
			);
		}
		// POST agregar invitado
		else if (url.startsWith(config.base) && method === 'POST') {
			return await controlador.agregarInvitado(peticion, respuesta);
		}
		// PUT modificar invitado
		else if (url.startsWith(config.base) && method === 'PUT') {
			const invitadoId = url.replace(config.base + '/', '');
			return await controlador.modificarInvitado(
				parseInt(invitadoId),
				peticion,
				respuesta,
			);
		}
		// DELETE eliminar invitado
		else if (url.startsWith(config.base) && method === 'DELETE') {
			const invitadoId = url.replace(config.base + '/', '');
			return await controlador.eliminarInvitado(
				parseInt(invitadoId),
				peticion,
				respuesta,
			);
		}
		// Ruta no encontrada dentro de la base
		else {
			return controlador.noEncontrado(peticion, respuesta);
		}
	} else {
		// Ruta completamente fuera de la base
		return controlador.noEncontrado(peticion, respuesta);
	}
}

export default rutasAPI;