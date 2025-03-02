const express = require("express")
const {
    createEmotions,
    getAllEmotions,
    getEmotion,
    deleteEmotion
} = require("../controllers/emotionController")
const router = express.Router()

// gets all the emotions
router.get('/', getAllEmotions)

// GET a single emotion
router.get('/:id', getEmotion)

// POST a new emotion
router.post('/', createEmotions)

// DELETE an emotion
router.delete('/:id', deleteEmotion)

module.exports = router