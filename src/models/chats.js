const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
   author: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true
   },
   message: {
      type: String,
      required: true
   },
   createdAt: {
      type: Number,
      required: true
   }
})

const ChatSchema = new mongoose.Schema({
   participants: {
      type: [{
         type: mongoose.SchemaTypes.ObjectId,
         ref: "User"
      }],
      required: true,
   },
   room: {
      type: String,
      unique: true,
      required: true
   },
   messages: {
      type: [MessageSchema],
      default: []
   },
   seen: {
      type: [{
         type: mongoose.SchemaTypes.ObjectId,
         ref: "User"
      }],
      default: []
   }
});

module.exports = mongoose.model("Chat", ChatSchema)