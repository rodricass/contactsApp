import { configureStore, Action } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import rootReducer, { RootState } from './rootReducer';

// Async thunk action parameters type
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

// Redux store definition
const store = configureStore({
  reducer: rootReducer,
});

export default store;
