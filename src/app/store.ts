import { configureStore } from '@reduxjs/toolkit';

import { appReducer } from 'features/app/slice';
import { authReducer } from 'features/auth/slice';
import { cardReducer } from 'features/cards/slice';
import { chatReducer } from 'features/chat/slice';
import { packReducer } from 'features/packs/slice';
import { profileReducer } from 'features/profile/slice';
import { userProfileReducer } from 'features/user/slice';
import { usersReducer } from 'features/users/slice';

export const store = configureStore({
  reducer: {
    app: appReducer,
    profile: profileReducer,
    auth: authReducer,
    pack: packReducer,
    card: cardReducer,
    users: usersReducer,
    userProfile: userProfileReducer,
    chat: chatReducer,
  },
});

export type AppRootStateType = ReturnType<typeof store.getState>;
export type AppDispatchType = typeof store.dispatch;
