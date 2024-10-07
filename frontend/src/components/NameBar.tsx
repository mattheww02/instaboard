import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUsername } from '../states/userSlice';

const NameBar: React.FC = () => {
  const [username, setUsernameState] = useState('');
  const dispatch = useDispatch();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setUsernameState(newName);
    dispatch(setUsername(newName));
    console.log("Dispatched username:", username);
  };

  return (
    <div>
      <input
        type="text"
        className="form-control"
        value={username}
        onChange={handleInputChange}
        placeholder="My name is..."
        style={{ padding: '10px', fontSize: '16px', width: '23.5em' }}
      />
    </div>
  );
};

export default NameBar;
