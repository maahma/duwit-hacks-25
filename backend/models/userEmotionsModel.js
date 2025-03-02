const mongoose = require("mongoose");

const userEmotionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // ref to user
  selectedEmotions: [
    {
      emotionId: { type: String, ref: "Emotion", required: true },  // ref to emotion schema
      dateSelected: { type: Date, default: Date.now }   // date when emotion was selected
    }
  ]
});

module.exports = mongoose.model("UserEmotion", UserEmotionSchema);