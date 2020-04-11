const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");

const PORT = process.env.PORT || 5000;
const router = require("./router");

const app = express();
const server = http.createServer(app);

const io = socketio(server);

io.on("connect", (socket) => {
  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });
    if (error) {
      return callback(error);
    }

    // Admin generated messages
    //Emit a message when user joins a room
    socket.emit("message", {
      user: "admin",
      text: `${user.name}, welcome to the room ${user.room}`,
    });

    //Broadcast a message to all users except the user who has joined
    socket.broadcast
      .to(user.room)
      .emit("message", { user: "admin", text: `${user.name} has joined.` });

    // Join the room
    socket.join(user.room);

    callback();
  });

  //User generated message
  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);

    // Send user message to all users within the room
    io.to(user.room).emit("message", { user: user.name, text: message });

    callback();
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});
app.use(router);

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
