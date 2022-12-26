import socketIo, { Socket } from 'socket.io-client';

import { MessageType } from 'features/chat/types';

export const socket = {
  socket: null as null | Socket,
  createConnection() {
    this.socket = socketIo('https://neko-back.herokuapp.com/');
  },
  destroyConnection() {
    this.socket?.disconnect();
    this.socket = null;
  },
  subscribe(
    initMessagesPublishedHandler: (messages: MessageType[]) => void,
    newMessageSentHandler: (message: MessageType) => void,
  ) {
    this.socket?.on('init-messages-published', initMessagesPublishedHandler);
    this.socket?.on('new-message-sent', newMessageSentHandler);
    this.socket?.emit('init');
  },
  sendName(name: string) {
    this.socket?.emit('client-name-sent', name);
  },
  sendMessage(message: string) {
    this.socket?.emit('client-message-sent', message);
  },
};
