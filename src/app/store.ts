import {configureStore} from '@reduxjs/toolkit'
import {appReducer} from '../features/application';

export const store = configureStore({
    reducer: {
        app:appReducer,
    }
});

export type AppRootStateType = ReturnType<typeof store.getState>
export type AppDispatchType = typeof store.dispatch