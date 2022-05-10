const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    people: {
      type: Array,
      require: true,
    },
    messages: [
      {
        senderID: String,
        senderUsername: String,
        text: String,
      },
    ],
    admin: { type: Array },
  },
  {
    timestamps: true,
  }
);
const Chat = mongoose.model("Chat", chatSchema);
module.exports = Chat;
