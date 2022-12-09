import React, { ReactElement, useEffect } from 'react';

import { Avatar, Button, FormControl, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { selectEmail, selectIsLoggedIn } from '../selectors';

import checkEmail from 'common/assets/images/check-email.png';
import style from 'common/assets/styles/Form.module.scss';
import { Path } from 'common/enums/Path';
import { useAppSelector } from 'common/hooks/useAppSelector';

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
