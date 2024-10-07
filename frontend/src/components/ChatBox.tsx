import React, { useState, useEffect, useRef } from "react";

const ChatBox: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]); // store messages
  const [input, setInput] = useState<string>(""); // store user input
  const ws = useRef<WebSocket | null>(null); // WebSocket instance

  const connectWebSocket = () => {
    ws.current = new WebSocket("ws://localhost:5000"); // Adjust the URL as needed

    ws.current.onopen = () => {
      console.log("WebSocket connection opened");
    };

    ws.current.onmessage = (e: MessageEvent) => {
      const message = e.data;
      setMessages((prevMessages) => [...prevMessages, message]); // Add new message to the array
    };

    ws.current.onclose = () => {
      console.log("WebSocket closed, attempting to reconnect...");
      // Reconnect if the connection is closed unexpectedly
      setTimeout(connectWebSocket, 1000);
    };

    ws.current.onerror = (err) => {
      console.error("WebSocket error:", err);
    };
  };

  useEffect(() => {
    // Establish WebSocket connection when the component mounts
    connectWebSocket();

    return () => {
      ws.current?.close(); // Clean up WebSocket connection on unmount
    };
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim() !== "" && ws.current?.readyState === WebSocket.OPEN) {
      // Send message if the WebSocket is open
      ws.current.send(input);
      setInput(""); // Clear input field
    } else {
      console.log("WebSocket connection is not open, retrying...");
    }
  };

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
