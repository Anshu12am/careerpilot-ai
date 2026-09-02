const mongoose = require("mongoose");

const careerAgentMessageSchema = new mongoose.Schema({
  
    userId:{
       type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    resumeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
      required: true,
    },
    sender: {
      type: String,
      enum: ["user", "ai"],
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
{
  timestamps: true,
})

module.exports = mongoose.model(
  "CareerAgentMessage",
  careerAgentMessageSchema
);