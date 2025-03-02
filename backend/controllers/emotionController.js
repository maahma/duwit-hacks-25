const Emotion = require("../models/emotionsModel")
const mongoose = require("mongoose")

// get all emotions
const getAllEmotions = async(req,res) => {
    const emotions = await Emotion.find({})
    res.status(200).json(emotions)
}

// get a single emotion
const getEmotion = async(req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such Emotion"})
    }

    const emotion = await Emotion.findById(id)

    if (!emotion) {
        return res.status(404).json({error: "No such emotion"})
    }

    res.status(200).json(emotion)
}

// create new emotion
const createEmotions = async (req, res) => {
    const {title} = req.body

    // add to db
    try {
        const emotion = await Emotion.create({title})
        res.status(200).json(emotion)
    } catch(error){
        res.status(400).json({error: error.message})
    }
}

// delete an emotion
const deleteEmotion = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such Emotion"})
    }

    const emotion = await Emotion.findOneAndDelete({_id: id})

    if (!emotion) {
        return res.status(404).json({error: "No such emotion"})
    }

    res.status(200).json(emotion)
} 

module.exports = {
    getAllEmotions,
    getEmotion,
    createEmotions,
    deleteEmotion
};