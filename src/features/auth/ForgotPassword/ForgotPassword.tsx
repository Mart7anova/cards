import React, { ReactElement, useEffect } from 'react';

import { Button, FormControl, Paper, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';

import style from '../../../common/assets/styles/Form.module.scss';
import { selectIsLoggedIn, selectPasswordIsChanging } from '../selectors';
import { forgotPassword } from '../slice';

import { Path } from 'common/enums/Path';
import { useAppDispatch } from 'common/hooks/useAppDispatch';
import { useAppSelector } from 'common/hooks/useAppSelector';
import { validateValuesForForm } from 'common/utils/validateValuesForForm';

export const ForgotPassword = (): ReactElement => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const passwordIsChanging = useAppSelector(selectPasswordIsChanging);

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validate: values => {
      return validateValuesForForm(values);
    },
    onSubmit: values => {
      dispatch(forgotPassword(values));
    },
  });

  const ERROR_EMAIL = formik.errors.email && formik.touched.email;

  useEffect(() => {
    if (isLoggedIn) navigate(Path.PACKS);
    if (passwordIsChanging) navigate(Path.CHECK_EMAIL);
  }, [isLoggedIn, passwordIsChanging]);

  return (
    <form onSubmit={formik.handleSubmit} className={style.formContainer}>
      <Paper className={style.paper}>
        <FormControl className={style.formItems}>
          <h1 className={style.title}>Sing In</h1>

          <TextField
            variant="standard"
            sx={{ m: 2 }}
            color={ERROR_EMAIL ? 'error' : 'primary'}
            label={ERROR_EMAIL ? formik.errors.email : 'Email'}
            error={!!ERROR_EMAIL}
            {...formik.getFieldProps('email')}
          />

          <p className={style.helpText}>
            Enter your email address and we will send you further instructions{' '}
          </p>

          <Button type="submit" variant="contained" sx={{ m: 2 }}>
            Send Instructions
          </Button>

          <p className={style.infoText}>Did you remember your password?</p>

          <Link to={Path.SIGN_IN} className={style.link}>
            Try logging in
          </Link>
        </FormControl>
      </Paper>
    </form>
  );
};
