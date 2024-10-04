import React, { useState } from "react";

const HomePage: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [showUsernameInput, setShowUsernameInput] = useState<boolean>(false);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleSetUsername = () => {
    if (username.trim()) {
      alert(`Username set to: ${username}`); // TODO: add change username logic
      setShowUsernameInput(false);
    } else {
      alert("Please enter a valid username.");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Welcome to InstaBoard</h1>
      <div>
        {showUsernameInput ? (
          <>
            <input
              type="text"
              value={username}
              onChange={handleUsernameChange}
              placeholder="Enter your username"
              style={{ padding: "10px", margin: "10px" }}
            />
            <button onClick={handleSetUsername} style={{ padding: "10px", margin: "10px" }}>
              Confirm Username
            </button>
          </>
        ) : (
          <button onClick={() => setShowUsernameInput(true)} style={{ padding: "10px", margin: "10px" }}>
            Set Username
          </button>
        )}
      </div>
      <div>
        <button style={{ padding: "10px", margin: "10px" }}>
          Create a Board
        </button>
        {/* TODO: handle board creation */}
        <button style={{ padding: "10px", margin: "10px" }}>
          Join a Board
        </button>
        {/* TODO: allow users to join boards */}
      </div>
    </div>
  );
};

export default HomePage;
