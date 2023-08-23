import express from 'express';
import { Server } from "socket.io"
import handlebars from "express-handlebars"
import __dirname from "./utils/utils.js";
import cartsRoutes from './routes/carts.routes.js';
import mongoose from 'mongoose';


import messageRoutes from './routes/message.routes.js'



const app = express()
const PORT = 8080;
const MONGO = 'mongodb+srv://ricardoyvl:1UAObqb6Jwwo6dI3@ecommerce.stcb13i.mongodb.net/ecommerce'
const connection = mongoose.connect(MONGO)


app.use(express.static(__dirname + '/public'))


// app.engine definimos un motor para la aplicacion
app.engine('handlebars', handlebars.engine());
//las plantillas van a estar alojadas en la carpeta view. CONFICORAMOS
app.set('views', __dirname + '/views')
// Ahora definimos el motor que vamos a usar en esas vistas
app.set('view engine', 'handlebars')

app.use('/', messageRoutes)
app.use('/carts', cartsRoutes)




const server = app.listen(PORT, () => {
    console.log('Servidor Funcionando en el Puerto' + PORT)
})
const io = new Server(server)


app.use(express.json())
app.use(express.urlencoded({ extended: true }))


const logs = [];

io.on('connection', socket => {
    console.log("connected")

    socket.emit('log', { logs })

    socket.on('message1', data => {
        io.emit('log', data)
    })

    socket.on('message2', data => {
        logs.push({ socketid: socket.id, message: data })
        io.emit('log', { logs })
    })
})







