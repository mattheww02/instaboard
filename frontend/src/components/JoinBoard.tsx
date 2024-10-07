import React from 'react';

// contains the content for the 'Join a Board' modal
const JoinBoard : React.FC = () => {
    return (
        <div >
            <div className="form-floating mb-3">
                <input className="form-control" id="name" type="text" placeholder="Enter board ID..." data-sb-validations="required" />
                <label htmlFor="name">Board ID</label>
                <div className="invalid-feedback" data-sb-feedback="name:required">Board ID required.</div>
            </div>
        </div>
    );
};

export default JoinBoard;