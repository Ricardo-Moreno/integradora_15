import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collection = 'Products'

const productsSchema = new mongoose.Schema({

    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    thumbnail: {
        type: String,
        require: true,
    },
    code: {
        type: String,
        require: true
    },
    stock: {
        type: Number,
        require: true
    },
})

productsSchema.plugin(mongoosePaginate)
const products = mongoose.model(collection, productsSchema);

export default products