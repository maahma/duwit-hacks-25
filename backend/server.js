// import modules
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const emotionRoutes = require("./routes/emotion_log")
const geminiRoutes = require("./routes/geminiRoutes");

// app
const app = express();

// middleware
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
}) 

// routes
app.use('/api/emotions', emotionRoutes)  // attaches all the routes related to a emotion
app.use("/api/gemini", geminiRoutes);

//connect to db
mongoose.connect(process.env.DB_URI).then(() => {
    app.listen(process.env.DB_PORT, () => 
        console.log("connected to db and server is running on port ", process.env.DB_PORT)
    );
}).catch((error) => {
    console.log(error)
})