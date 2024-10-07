import React, { useState } from "react";
import NameBar from "../components/NameBar";
import iconWhite from "../assets/img/icon_white.png";
import Modal from "../components/Modal";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import JoinBoard from "../components/JoinBoard";
import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const createBoard = async () => {
    try {
        const response = await fetch('http://localhost:5000/api/board/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await response.json();
        const boardId = data.boardId;

        navigate(`/board/${boardId}`);
    } catch (error) {
        console.error('Error creating board:', error);
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
                <button className="btn btn-primary btn-lg px-5 py-3 me-sm-3 fs-6 fw-bolder" onClick={createBoard}>Create</button>
                {/* TODO: handle board creation */} 
                <div className="btn btn-outline-dark btn-lg px-5 py-3 fs-6 fw-bolder" data-bs-toggle="modal" data-bs-target="#joinModal">Join a board</div>
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
      <div>
        <Modal title="Join a Board" modalId="joinModal">
          <JoinBoard/>
        </Modal>
      </div>
    </header>
  );
};

export default HomePage;
