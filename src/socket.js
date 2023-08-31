import { Server } from "socket.io";
import messages from './dao/models/messages.schema.js';

// Declarar logs fuera de setupSocket
const logs = [];

export const setupSocket = (server) => {
    const io = new Server(server);

    io.on('connection', socket => {
        console.log("Conectado");

        socket.emit('log', { logs });

        socket.on('message1', data => {
            io.emit('log', data);
        });

        socket.on('message2', async data => {
            logs.push({ socketid: socket.id, message: data });
            io.emit('log', { logs });

            // Guardar el mensaje en la base de datos
            try {
                const newMessage = {
                    user: data.user,
                    message: data.message
                };
                await messages.create(newMessage);
            } catch (error) {
                console.error("Error al guardar el mensaje:", error);
            }
        });
    });
};
