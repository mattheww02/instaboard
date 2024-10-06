import React, { useState, useEffect } from "react";

const ChatBox: React.FC = () => {
    const [messages, setMessages] = useState<string[]>([]); // store messages
    const [input, setInput] = useState<string>(""); // store user input

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (input.trim() !== "") {
            const ws = new WebSocket("ws://localhost:5000"); //TODO: change URL
            ws.onopen = () => { ws.send(input); };
            //setMessages([...messages, input]); // add the new message
            setInput(""); // clear input field
        }
    };

    useEffect(() => {
        const ws = new WebSocket("ws://localhost:5000"); //TODO: change URL
        ws.onmessage = (e: MessageEvent) => {
            const message = e.data;
            setMessages([...messages, message]);
        };
        return () => { ws.close(); };
    }, []);

    return (
        <div className="chatbox-container">
        {/* Messages Section */}
        <div className="chatbox-messages">
          {messages.length === 0 && <p>No messages yet</p>}
          {messages.map((message, index) => (
            <div key={index} className="message">
              <div className="username text-primary fw-bold">Username</div>
              <p>{message}</p>
            </div>
          ))}
        </div>
  
        {/* Input Section */}
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