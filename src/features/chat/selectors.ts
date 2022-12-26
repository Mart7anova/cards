import { AppRootStateType } from 'app/store';
import { MessageType } from 'features/chat/types';

export const selectMessages = (state: AppRootStateType): MessageType[] =>
  state.chat.messages;
