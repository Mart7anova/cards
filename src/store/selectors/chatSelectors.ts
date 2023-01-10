import { MessageType } from 'api/types';
import { AppRootStateType } from 'store/index';

export const selectMessages = (state: AppRootStateType): MessageType[] =>
  state.chat.messages;
