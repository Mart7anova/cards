import React, { useEffect } from 'react';
import style from '../../../common/assets/styles/Form.module.scss';
import { Button, FormControl, Paper, TextField } from '@mui/material';
import { useAppDispatch } from 'common/hooks/useAppDispatch';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from 'common/hooks/useAppSelector';
import { getIsLoggedIn, getPasswordIsChanging } from '../selectors';
import { useFormik } from 'formik';
import { validateValuesForForm } from 'common/utils/validateValuesForForm';
import { PATH } from 'common/enums/path';
import { forgotPassword } from '../slice';


export const ForgotPassword = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useAppSelector(getIsLoggedIn);
  const passwordIsChanging = useAppSelector(getPasswordIsChanging);

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

  const emailError = formik.errors.email && formik.touched.email;

  useEffect(() => {
    if (isLoggedIn) navigate(PATH.PACKS);
    if (passwordIsChanging) navigate(PATH.CHECK_EMAIL);
  }, [isLoggedIn, passwordIsChanging]);

  return (
    <form onSubmit={formik.handleSubmit} className={style.formContainer}>
      <Paper className={style.paper}>
        <FormControl className={style.formItems}>
          <h1 className={style.title}>Sing In</h1>

          <TextField variant={'standard'}
                     sx={{ m: 2 }}
                     color={emailError ? 'error' : 'primary'}
                     label={emailError ? formik.errors.email : 'Email'}
                     error={!!emailError}
                     {...formik.getFieldProps('email')}
          />

          <p className={style.helpText}>Enter your email address and we will send you
            further instructions </p>

          <Button type={'submit'} variant={'contained'} sx={{ m: 2 }}>Send
            Instructions</Button>

          <p className={style.infoText}>Did you remember your password?</p>

          <Link to={PATH.SIGN_IN} className={style.link}>Try logging in</Link>
        </FormControl>
      </Paper>
    </form>
  );
};
