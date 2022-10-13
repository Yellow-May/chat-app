const ChatModel = require("../models/chats");

const saveChat = async (data) => {
   try {
      const chats = await ChatModel.findById(data.chatid);
      chats.messages.push({ ...data });
      chats.seen = [data.author]
      await chats.save();
   } catch (error) {
      console.log(error);
      return { message: "Internal server error" }
   }
}

module.exports = saveChat