import React, { useState, useEffect, useRef } from "react";
import { useSelector } from 'react-redux';
import { RootState } from '../states/store';
import { useParams } from "react-router-dom";

interface Message {
  username: string;
  message: string;
}

const ChatBox: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]); // store messages
  const [input, setInput] = useState<string>(""); // store user input
  const ws = useRef<WebSocket | null>(null); // websocket to send get/send messages
  const username = useSelector((state: RootState) => state.user.username);
  const { boardId } = useParams<{ boardId: string }>();

  useEffect(() => {
    ws.current = new WebSocket(`ws://localhost:5000/ws?boardId=${boardId}`); // TODO: change URL when deploying
    // listen for messages
    ws.current.onmessage = (e: MessageEvent) => {
      const message = JSON.parse(e.data);
      setMessages((prevMessages) => [...prevMessages, message]); // update list of messages
    };

    // close websocket connection on disconnect
    return () => {
      ws.current?.close();
    };
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim() !== "") { // TODO: make username persist properly
      ws.current?.send(JSON.stringify({  // use websocket to send message to server
        type: "chat",
        boardId: boardId,
        username: username,
        message: input
      }));
      setInput(""); // clear input field
    }
  };

  return (
    <div className="chatbox-container">
      {/* message list */}
      <div className="chatbox-messages">
        {messages.length === 0 && <p>No messages yet</p>}
        {messages.map((message, index) => (
          <div key={index} className="message d-flex">
            <div className="username text-primary fw-bold text-start">{message.username}</div>
            <div className="text-start">{message.message}</div>
          </div>
        ))}
      </div>

      {/* input new message */}
      <form onSubmit={handleSubmit} className="chatbox-form">
        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
          />
          <label>Send a message</label>
        </div>
      </form>
    </div>
  );
};

export default ChatBox;
