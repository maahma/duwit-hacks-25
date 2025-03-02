const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    displayName: String,
}, {timestamps: true});

module.exports = mongoose.model("User", userSchema)