import { store } from 'store/store';

export type AppRootStateType = ReturnType<typeof store.getState>;
export type AppDispatchType = typeof store.dispatch;
