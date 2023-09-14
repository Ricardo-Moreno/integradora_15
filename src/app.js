import dotenv from 'dotenv';
import session from 'express-session';
import express from 'express';
import handlebars from "express-handlebars";
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import MongoStore from 'connect-mongo';

import cartsRoutes from './routes/carts.routes.js';
import productsRoutes from './routes/products.routes.js';
import sessionsRoutes from './routes/sessions.routes.js';
import viewsRoutes from './routes/views.routes.js'
import passport from 'passport';
import initializePassport from './config/passport.config.js';

dotenv.config();
const app = express();
const PORT = 8080;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

mongoose.connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

initializePassport();

// Configura express-session antes de passport.session()
app.use(session({
    store: new MongoStore({
        mongoUrl: process.env.MONGO,
        ttl: 3600
    }),
    secret: "CoderSecretSHHHHH",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars');

app.use('/', viewsRoutes);
app.use('/api/sessions', sessionsRoutes);
app.use('/products', productsRoutes);
app.use('/api/carts', cartsRoutes);

const server = app.listen(PORT, () => {
    console.log('Servidor Funcionando en el Puerto ' + PORT);
});
