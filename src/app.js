import dotenv from 'dotenv';
import express from 'express';
import handlebars from "express-handlebars";
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import cartsRoutes from './routes/carts.routes.js';
import productsRoutes from './routes/products.routes.js';
// import messageRoutes from './routes/message.routes.js';
// import { setupSocket } from './socket.js';


dotenv.config();
const app = express();
const PORT = 8080;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

mongoose.connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars');


// app.use('/', messageRoutes);
app.use('/api/carts', cartsRoutes);
app.use('/products', productsRoutes);

const server = app.listen(PORT, () => {
    console.log('Servidor Funcionando en el Puerto ' + PORT);
});

// Configura los eventos de Socket.io usando la función setupSocket
// setupSocket(server);
