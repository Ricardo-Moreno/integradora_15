import mongoose from "mongoose";

const collection = 'Carts'

const cartsSchema = new mongoose.Schema({
    id: String,
    products: [
        {
            product: String,
            quantity: Number
        }
    ]
});


const carts = mongoose.model(collection, cartsSchema);

export default carts