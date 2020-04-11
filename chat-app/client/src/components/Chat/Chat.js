import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  const ENDPOINT = "localhost:5000";

  useEffect(() => {
    // Parse data from URL and put it an object
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setName(name);
    setRoom(room);

    // Emit data
    socket.emit("join", { name, room });
  }, [ENDPOINT, location.search]); //rerender only if data or ENDPOINT changes
  return <h1>Chat</h1>;
};

export default Chat;
