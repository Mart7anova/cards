import React, { ReactElement, useEffect } from 'react';

import { Avatar, Button, FormControl, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import checkEmail from 'assets/icon/check-email.png';
import { Path } from 'enums';
import { useAppSelector } from 'hooks';
import { selectEmail, selectIsLoggedIn } from 'store/selectors';
import style from 'styles/Form.module.scss';

export const CheckEmail = (): ReactElement => {
  const navigate = useNavigate();

  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const email = useAppSelector(selectEmail);

  useEffect(() => {
    if (isLoggedIn) navigate(Path.PACKS);
  }, [isLoggedIn]);

  const loginNavigationHandler = (): void => {
    navigate(Path.SIGN_IN);
  };

  return (
    <div className={style.formContainer}>
      <Paper className={style.paper}>
        <FormControl className={style.formItems}>
          <h1 className={style.title}>Sing In</h1>

          <div className={style.flexContainer}>
            <Avatar alt="check email" src={checkEmail} className={style.img} />
          </div>

          <p className={style.helpText} style={{ textAlign: 'center' }}>
            We’ve sent an Email with instructions to {email}
          </p>

          <Button variant="contained" sx={{ m: 2 }} onClick={loginNavigationHandler}>
            Back to login
          </Button>
        </FormControl>
      </Paper>
    </div>
  );
};
