import { Socket } from "socket.io";
import socketIO from 'socket.io';
import { UsuariosLista } from '../class/usuarios-lista';
import { Usuario } from '../class/usuario';

// exportar usuarios conectados  
export const usariosConectados = new UsuariosLista();

// logica para desconectar un cliente
export const desconectar = (cliente: Socket) => {

    cliente.on('disconnect', () => {
        console.log('Cliente desconectado... ', cliente.id);
        // eliminamos el usuario que se ha desconectado
        usariosConectados.deleteUsuario(cliente.id);
    })
}

// conectar cliente
export const conectarCliente = (cliente: Socket) => {

    // creamos una instancia de un usuario
    const usuario = new Usuario(cliente.id);
    usariosConectados.agregar(usuario);

}

// escuchar mensajes
export const mensaje = (cliente: Socket, io: socketIO.Server) => {

    cliente.on('mensaje', (payload: { de: string, cuerpo: string }) => {

        console.log("Mensaje recibido", payload);

        io.emit('nuevo-mensaje', payload);

    });
}

// escuchar login usuario
export const usuarioLogin = (cliente: Socket, io: socketIO.Server) => {

    cliente.on('configurar-usuario', (payload: { nombre: string }, callback: any) => {

        // console.log('Usuario configurando', payload.nombre);

        // Actualizar datos de usuario
        usariosConectados.actualizarUsuario(cliente.id, payload.nombre);

        callback({
            Ok: true,
            message: `Usuario ${payload.nombre}, configurado.`
        });

    });
}