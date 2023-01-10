import React, { ReactElement, useEffect, useState } from 'react';

import { Button, TextField } from '@mui/material';

import { useAppDispatch, useAppSelector } from 'hooks';
import style from 'pages/chat/ChatPage.module.scss';
import { selectMessages, selectProfile } from 'store/selectors';
import { createConnection, destroyConnection, sendMessage, sendName } from 'store/thunks';

export const ChatPage = (): ReactElement => {
  const dispatch = useAppDispatch();

  const messages = useAppSelector(selectMessages);
  const { name } = useAppSelector(selectProfile);

  const [messageText, setMessageText] = useState('');

  useEffect(() => {
    dispatch(createConnection());
    dispatch(sendName(name));

    return () => {
      dispatch(destroyConnection());
    };
  }, []);

  const sendMessageHandler = (): void => {
    dispatch(sendMessage(messageText));
    setMessageText('');
  };

  return (
    <div className={style.chat}>
      <div className={style.messages}>
        {messages.map(({ _id: id, message, user: { name } }) => (
          <div key={id} className={style.message}>
            <h3>{name}</h3>
            <p>{message}</p>
          </div>
        ))}
      </div>

      <div className={style.controls}>
        <TextField
          fullWidth
          value={messageText}
          onChange={e => setMessageText(e.currentTarget.value)}
        />
        <Button
          className={style.controlsButton}
          variant="contained"
          type="submit"
          onClick={sendMessageHandler}
        >
          Send
        </Button>
      </div>
    </div>
  );
};
