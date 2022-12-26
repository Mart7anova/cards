import React, { ReactElement, useEffect, useState } from 'react';

import { Button, TextField } from '@mui/material';

import style from './index.module.scss';

import { useAppDispatch } from 'common/hooks/useAppDispatch';
import { useAppSelector } from 'common/hooks/useAppSelector';
import { selectMessages } from 'features/chat/selectors';
import {
  createConnection,
  destroyConnection,
  sendMessage,
  sendName,
} from 'features/chat/slice';
import { selectProfile } from 'features/profile/selectors';

export const Chat = (): ReactElement => {
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
