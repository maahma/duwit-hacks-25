const mongoose = require("mongoose")

const Schema = mongoose.Schema

const emotionSchema = new Schema({
    title: {
        type: String,
        required: true,
    }
}, {timestamps: true})

module.exports = mongoose.model("Emotion", emotionSchema)