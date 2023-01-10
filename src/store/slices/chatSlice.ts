import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { MessageType } from 'api/types';

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    messages: [] as MessageType[],
  },
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
