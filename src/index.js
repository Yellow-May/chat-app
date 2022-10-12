require('dotenv').config();
const http = require("http");
const mongoose = require('mongoose');
const { Server } = require('socket.io');
const app = require('./app');

const server = http.createServer(app);

const io = new Server(server, {
   cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
   }
})

io.on("connection", (socket) => {
   console.log(`User Connected: ${socket.id}`);

   socket.on("join_room", (data) => {
      socket.join(data);
      console.log(`User with ID: ${socket.id} joined room: ${data}`);
   });

   socket.on("send_message", (data) => {
      socket.to(data.roomid).emit("receive_message", data);
   });

   socket.on("disconnect", () => {
      console.log("User Disconnected", socket.id);
   });
});

const start = async () => {
   try {
      await mongoose.connect("mongodb://localhost:27017/chat-io");
      server.listen(5000, () => {
         console.info(`Server Running on port: 5000`)
      })
   } catch (error) {
      console.error(error);
      window.process.exit(1);
   }
}

start()