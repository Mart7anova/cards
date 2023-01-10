import { configureStore } from '@reduxjs/toolkit';

import {
  appReducer,
  authReducer,
  cardReducer,
  chatReducer,
  packReducer,
  profileReducer,
  userProfileReducer,
  usersReducer,
} from 'store/slices';

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
