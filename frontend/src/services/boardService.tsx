

const createNewBoard = async () => {
    try {
        const response = await fetch('http://localhost:5000/api/board/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await response.json();
        return data.boardId;

    } catch (error) {
        console.error('Error creating board:', error);
    }
};
  
export { createNewBoard };