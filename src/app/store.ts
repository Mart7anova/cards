import {configureStore} from '@reduxjs/toolkit'
import {appReducer} from '../features/application';
import {profileReducer} from '../features/profile';

export const store = configureStore({
    reducer: {
        app:appReducer,
        profile: profileReducer
    }
});

export type AppRootStateType = ReturnType<typeof store.getState>
export type AppDispatchType = typeof store.dispatch