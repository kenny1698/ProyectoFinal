import mensajeApi from '../../api/mensaje.js'

export default async function configurarSocket(socket, sockets) {
    const mensajes = await mensajeApi.listarAll()
    socket.emit('mensajes', mensajes)

    socket.on('nuevoMensaje', async mensaje => {
        mensaje.fyh = new Date().toLocaleString()
        await mensajeApi.guardar(mensaje)
        const mensajes = await mensajeApi.listarAll()
        sockets.emit('mensajes', mensajes)
    })
}