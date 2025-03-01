const express = require("express")
const Emotion = require("../models/emotionsModel")
const router = express.Router()

// gets all the emotions
router.get('/', (req, res) => {
    res.json({mssg: "GET all emotions"})
})

// GET a single emotion
router.get('/:id', (req, res) => {
    res.json({mssg: "GET a single emotion"})
})

// POST a new emotion
router.post('/', async(req, res) => {
    const {title} = req.body
    try {
        const emotion = await Emotion.create({title})
        res.status(200).json(emotion)
    } catch(error){
        res.status(400).json({error: error.message})
    }
})

// DELETE an emotion
router.delete('/:id', (req, res) => {
    res.json({mssg: "DELETE an emotion"})
})

// UPDATE an emotion
router.patch('/:id', (req, res) => {
    res.json({mssg: "UPDATE an emotion"})
})

module.exports = router