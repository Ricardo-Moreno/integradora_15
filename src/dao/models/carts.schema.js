import mongoose from "mongoose";

const collection = 'Carts'

const cartsSchema = new mongoose.Schema({


    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Products"
            },
            quantity: {
                type: Number,
                default: 1
            }
        }
    ]


});


const carts = mongoose.model(collection, cartsSchema);

export default carts

