import React, { useState } from 'react';

const Home: React.FC = () => {
  const [username, setUsername] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
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

export default Home;
