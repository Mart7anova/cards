import {configureStore} from '@reduxjs/toolkit'
import {appReducer} from '../features/app';
import {profileReducer} from '../features/profile';
import {authReducer} from '../features/auth';
import {packReducer} from '../features/packs';
import { cardReducer } from '../features/cards';

export const store = configureStore({
    reducer: {
        app: appReducer,
        profile: profileReducer,
        auth: authReducer,
        pack: packReducer,
        card: cardReducer,
    }
});

export type AppRootStateType = ReturnType<typeof store.getState>
export type AppDispatchType = typeof store.dispatch