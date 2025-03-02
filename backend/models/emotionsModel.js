const mongoose = require("mongoose")

const emotionSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    name: { type: String, required: true }, // Display name
    relatedEmotions: [{ type: String }] // List of related emotion IDs
}, {timestamps: true})

module.exports = mongoose.model("Emotion", emotionSchema)