import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { socket } from 'api/socket';
import { MessageType } from 'features/chat/types';

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

const initialState = {
  messages: [] as MessageType[],
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setMessages: (state, action: PayloadAction<MessageType[]>) => {
      state.messages = action.payload;
    },
    setNewMessage: (state, action: PayloadAction<MessageType>) => {
      state.messages = [...state.messages, action.payload];
    },
  },
});

export const chatReducer = chatSlice.reducer;
export const { setMessages, setNewMessage } = chatSlice.actions;
