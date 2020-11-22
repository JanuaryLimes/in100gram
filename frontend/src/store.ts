import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import counterReducer from './features/counter/counterSlice';
import logger from 'redux-logger'
import {authReducer} from "./features/auth/authSlice";

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        auth: authReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
