import React, { useState, useEffect, useRef } from "react";

const ChatBox: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]); // store messages
  const [input, setInput] = useState<string>(""); // store user input
  const ws = useRef<WebSocket | null>(null); // websocket to send get/send messages

  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:5000"); // TODO: change URL when deploying

    // listen for messages
    ws.current.onmessage = (e: MessageEvent) => {
      const message = e.data;
      setMessages((prevMessages) => [...prevMessages, message]); // update list of messages
    };

    // close websocket connection on disconnect
    return () => {
      ws.current?.close();
    };
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim() !== "") {
      ws.current?.send(input); // use websocket to send message to server
      setInput(""); // clear input field
    }
  };

  return (
    <div className="chatbox-container">
      {/* message list */}
      <div className="chatbox-messages">
        {messages.length === 0 && <p>No messages yet</p>}
        {messages.map((message, index) => (
          <div key={index} className="message">
            <div className="username text-primary fw-bold">Username</div>
            <p>{message}</p>
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
