import { configureStore } from '@reduxjs/toolkit';
import { appReducer } from 'features/app/slice';
import { profileReducer } from 'features/profile/slice';
import { authReducer } from 'features/auth/slice';
import { cardReducer } from 'features/cards/slice';
import { packReducer } from 'features/packs/slice';

export const store = configureStore({
  reducer: {
    app: appReducer,
    profile: profileReducer,
    auth: authReducer,
    pack: packReducer,
    card: cardReducer,
  },
});

export type AppRootStateType = ReturnType<typeof store.getState>
export type AppDispatchType = typeof store.dispatch