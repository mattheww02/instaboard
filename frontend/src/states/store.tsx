import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice'; // Import your user slice

const store = configureStore({
  reducer: {
    user: userReducer, // Include your user slice reducer
  },
});

export type RootState = ReturnType<typeof store.getState>; // Type for RootState
export type AppDispatch = typeof store.dispatch; // Type for AppDispatch

export default store; // Export the store