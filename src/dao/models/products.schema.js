import mongoose from "mongoose";

const collection = 'Products'

const productsSchema = new mongoose.Schema({

    nombre: {
        type: String,
        require: true
    },
    apellido: {
        type: String,
        require: true
    },
    edad: {
        type: Number,
        require: true
    },
    dni: {
        type: String,
        require: true,
        unique: true
    },
    curso: {
        type: String,
        require: true
    },
    nota: {
        type: Number,
        require: true
    },
})

const products = mongoose.model(collection, productsSchema);

export default products