import mongoose from "mongoose";

const collection = 'Messages'

const messagesSchema = new mongoose.Schema({

    user: {
        type: String,
        require: true
    },
    message: {
        type: String,
        require: true
    }
})



const messages = mongoose.model(collection, messagesSchema);

export default messages