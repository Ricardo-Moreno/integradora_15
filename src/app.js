import dotenv from 'dotenv';
import express from 'express';
import { Server } from "socket.io";
import handlebars from "express-handlebars"// Importa express-handlebars
import mongoose from 'mongoose';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

import cartsRoutes from './routes/carts.routes.js';
import productsRoutes from './routes/products.routes.js';
import messageRoutes from './routes/message.routes.js';



dotenv.config();
const app = express();
const PORT = 8080;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


mongoose.connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // ... otras opciones de configuración de mongoose
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

// Utiliza exphbs() como la función de configuración de Handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use('/', messageRoutes);
app.use('/carts', cartsRoutes);
app.use('/products', productsRoutes);

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
