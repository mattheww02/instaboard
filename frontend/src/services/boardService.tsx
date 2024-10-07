
const createNewBoard = async () => {
    const response = await fetch('/api/boards', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}), // Send any required data if necessary
    });
  
    if (!response.ok) {
      throw new Error('Failed to create board');
    }
  
    const data = await response.json();
    return data.boardId; // Assuming your backend returns the new board ID
  };
  
  export { createNewBoard };