import React, { useState } from "react";
import NameBar from "../components/NameBar";
import iconWhite from "../assets/img/icon_white.png";

const HomePage: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [showUsernameInput, setShowUsernameInput] = useState<boolean>(false);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };//TODO: handle in NameBar component

  const handleSetUsername = () => {
    if (username.trim()) {
      alert(`Username set to: ${username}`); // TODO: add change username logic
      setShowUsernameInput(false);
    } else {
      alert("Please enter a valid username.");
    }
  };

  return (
    <header className="py-5">
      <div className="container px-5 pb-5">
        <div className="row gx-5 align-items-center">
          <div className="col-xxl-5">
              
            <div className="text-center text-xxl-start">
              <div className="fs-3 fw-light text-muted">Welcome to</div>
              <h1 className="display-3 fw-bolder mb-1"><span className="text-gradient d-inline">InstaBoard</span></h1>
              <div className="badge bg-gradient-primary-to-secondary text-white mb-5"><div className="text-uppercase">Design &middot; Develop &middot; Collaborate</div></div>
              <div className="d-grid gap-3 d-sm-flex justify-content-sm-center justify-content-xxl-start mb-3">
                <a className="btn btn-primary btn-lg px-5 py-3 me-sm-3 fs-6 fw-bolder" href="/board">Create</a>
                {/* TODO: handle board creation */} 
                <a className="btn btn-outline-dark btn-lg px-5 py-3 fs-6 fw-bolder" href="/">Join a board</a>
                {/* TODO: allow users to join boards */}
              </div>
              <div className="d-grid gap-3 d-sm-flex justify-content-sm-center justify-content-xxl-start mb-3">
                <NameBar/>
              </div>
            </div>
          </div>

          <div className="col-xxl-7">
            <div className="d-flex justify-content-center mt-5 mt-xxl-0">
              <div className="profile bg-gradient-primary-to-secondary d-flex justify-content-center align-items-center">
                <img src={iconWhite} className="App-logo" alt="..." />
              </div>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};

export default HomePage;
