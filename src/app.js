import express from 'express';
import { Server } from "socket.io";
import handlebars from "express-handlebars";
import mongoose from 'mongoose';
import dotenv from 'dotenv'; // Importa dotenv para cargar las variables de entorno

import cartsRoutes from './routes/carts.routes.js';
import messageRoutes from './routes/message.routes.js';

dotenv.config(); // Carga las variables de entorno del archivo .env

const app = express();
const PORT = 8080;

mongoose.connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // ... otras opciones de configuración de mongoose
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.engine('handlebars', handlebars());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use('/', messageRoutes);
app.use('/carts', cartsRoutes);

const server = app.listen(PORT, () => {
    console.log('Servidor Funcionando en el Puerto ' + PORT);
});

const io = new Server(server);

const logs = [];

io.on('connection', socket => {
    console.log("Conectado");

    socket.emit('log', { logs });

    socket.on('message1', data => {
        io.emit('log', data);
    });

    socket.on('message2', data => {
        logs.push({ socketid: socket.id, message: data });
        io.emit('log', { logs });
    });
});
