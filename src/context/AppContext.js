import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { loadTimers, saveTimers, loadHistory, saveHistory } from '../utils/storage';

// Context setup with reducer for state management
const AppContext = createContext();

const initialState = {
  timers: [],
  history: [],
  categories: ['Workout', 'Study', 'Break', 'Other'],
};

function appReducer(state, action) {
  switch (action.type) {
    case 'LOAD_DATA':
      return { ...state, ...action.payload };
    case 'ADD_TIMER':
      const newTimers = [...state.timers, action.payload];
      saveTimers(newTimers);
      return { ...state, timers: newTimers };
    case 'UPDATE_TIMER':
      const updatedTimers = state.timers.map(timer => 
        timer.id === action.payload.id ? action.payload : timer
      );
      saveTimers(updatedTimers);
      return { ...state, timers: updatedTimers };
    case 'ADD_HISTORY':
      const newHistory = [action.payload, ...state.history];
      saveHistory(newHistory);
      return { ...state, history: newHistory };
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    async function loadAppData() {
      const [timers, history] = await Promise.all([
        loadTimers(),
        loadHistory(),
      ]);
      dispatch({
        type: 'LOAD_DATA',
        payload: { timers: timers || [], history: history || [] },
      });
    }
    loadAppData();
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}