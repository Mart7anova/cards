import React, { ReactElement, useEffect } from 'react';

import { Button, Checkbox, FormControlLabel, Paper, TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';

import style from '../../../common/assets/styles/Form.module.scss';
import { selectIsLoggedIn } from '../selectors';
import { signIn } from '../slice';

import { Password } from 'common/components/Password/Password';
import { Path } from 'common/enums/Path';
import { useAppDispatch } from 'common/hooks/useAppDispatch';
import { useAppSelector } from 'common/hooks/useAppSelector';
import { validateValuesForForm } from 'common/utils/validateValuesForForm';

export const SignIn = (): ReactElement => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validate: values => {
      return validateValuesForForm(values);
    },
    onSubmit: (values, { resetForm }) => {
      dispatch(signIn(values));
      resetForm({ values: { ...values, password: '' } });
    },
  });

  const errorEmail = formik.errors.email && formik.touched.email;
  const errorPassword = formik.errors.password && formik.touched.password;

  useEffect(() => {
    if (isLoggedIn) navigate(Path.PACKS);
  }, [isLoggedIn]);

  return (
    <form onSubmit={formik.handleSubmit} className={style.formContainer}>
      <Paper className={style.paper}>
        <FormControl className={style.formItems}>
          <h1 className={style.title}>Sing In</h1>

          <TextField
            variant="standard"
            sx={{ m: 2 }}
            color={errorEmail ? 'error' : 'primary'}
            label={errorEmail ? formik.errors.email : 'Email'}
            error={!!errorEmail}
            {...formik.getFieldProps('email')}
          />

          <Password
            label="Password"
            passError={errorPassword}
            formikErrorPass={formik.errors.password}
            {...formik.getFieldProps('password')}
          />

          <FormControlLabel
            label="Remember me"
            sx={{ m: 1 }}
            control={<Checkbox {...formik.getFieldProps('rememberMe')} />}
          />

          <Link to={Path.FORGOT_PASSWORD} className={`${style.link} ${style.forgotLink}`}>
            Forgot Password?
          </Link>

          <Button type="submit" variant="contained" sx={{ m: 2 }}>
            Sign In
          </Button>

          <p className={style.infoText}>Do not have account?</p>

          <Link to={Path.SIGN_UP} className={style.link}>
            Sign Up
          </Link>
        </FormControl>
      </Paper>
    </form>
  );
};
