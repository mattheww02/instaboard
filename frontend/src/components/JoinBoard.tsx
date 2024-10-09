import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

// contains the content for the 'Join a Board' modal
const JoinBoard : React.FC = () => {
    const [boardId, setBoardId] = useState("");
    const navigate = useNavigate();

    //TODO: validate
    const joinBoard = () => {
        navigate(`/board/${boardId}`);
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBoardId(e.target.value);
    }

    return (
        <div >
            <div className="form-floating mb-3">
                <input 
                    className="form-control" 
                    id="board-id" 
                    type="text" 
                    data-sb-validations="required"
                    onChange={handleInputChange}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            const hiddenButton = document.getElementById('dismissModalButton');
                            hiddenButton?.click();
                            joinBoard();
                        }
                    }}
                />
                {/* dismiss modal using hidden button */}
                <button id="dismissModalButton" type="button" className="d-none" data-bs-dismiss="modal" ></button>
                <label htmlFor="name">Board ID</label>
                <div className="invalid-feedback" data-sb-feedback="name:required">Board ID required.</div>
            </div>
        </div>
    );
};

export default JoinBoard;