import React, { useState } from "react";

const ChatBox: React.FC = () => {
    const [messages, setMessages] = useState<string[]>([]); // store messages
    const [input, setInput] = useState<string>(""); // store user input

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (input.trim() !== "") {
            setMessages([...messages, input]); // add the new message
            setInput(""); // clear input field
        }
    };

    return (
        <div className="container">
            <div className="d-flex">
                {messages.length === 0 && <p>No messages yet</p>}
                {messages.map((message, index) => (
                <div key={index} className="message">
                    {message}
                </div>
                ))}
            </div>
            <form onSubmit={handleSubmit} className="chatbox-form">
                
                <div className="form-floating mb-3">
                    <input
                    type="text"
                    className="form-control"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message..."/>
                    <label htmlFor="name">Send a message</label>
                </div>
                {/* <button type="submit" className="chatbox-submit">
                Send
                </button> */}
            </form>
        </div>
    );
};

export default ChatBox;