import {configureStore} from '@reduxjs/toolkit'
import {appReducer} from "../features/app/appSlice";
import {profileReducer} from "../features/profile/profileSlice";
import {authReducer} from "../features/auth/authSlice";
import {cardReducer} from "../features/cards/cardsSlice";
import {packReducer} from "../features/packs/packsSlice";

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