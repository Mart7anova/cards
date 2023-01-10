import { createAsyncThunk } from '@reduxjs/toolkit';

import { socket } from 'api/socket';
import { MessageType } from 'api/types';
import { setMessages, setNewMessage } from 'store/slices';

export const createConnection = createAsyncThunk(
  'chat/createConnection',
  (_, { dispatch }) => {
    socket.createConnection();
    socket.subscribe(
      (messages: MessageType[]) => {
        dispatch(setMessages(messages));
      },
      (message: MessageType) => {
        dispatch(setNewMessage(message));
      },
    );
  },
);

export const destroyConnection = createAsyncThunk('chat/destroyConnection', () => {
  socket.destroyConnection();
});
export const sendMessage = createAsyncThunk('chat/sendMessage', (message: string) => {
  socket.sendMessage(message);
});

export const sendName = createAsyncThunk('chat/sendName', (name: string) => {
  socket.sendName(name);
});
