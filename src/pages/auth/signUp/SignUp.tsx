import React, { ReactElement, useEffect } from 'react';

import { Button, Paper, TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';

import { Password } from 'components/common';
import { Path } from 'enums';
import { useAppDispatch, useAppSelector } from 'hooks';
import { selectIsLoggedIn, selectIsSignedUp } from 'store/selectors';
import { signUp } from 'store/thunks';
import style from 'styles/Form.module.scss';
import { validateValuesForForm } from 'utils';

export const SignUp = (): ReactElement => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const isSignedUp = useAppSelector(selectIsSignedUp);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
      confirmPassword: '',
    },
    validate: values => {
      return validateValuesForForm(values);
    },
    onSubmit: (values, { resetForm }) => {
      dispatch(signUp(values));
      resetForm({
        values: {
          email: '',
          password: '',
          rememberMe: false,
          confirmPassword: '',
        },
      });
    },
  });

  const errorEmail = formik.errors.email && formik.touched.email;
  const errorPassword = formik.errors.password && formik.touched.password;
  const errorConfirmPassword =
    formik.errors.confirmPassword && formik.touched.confirmPassword;

  useEffect(() => {
    if (isLoggedIn) navigate(Path.PACKS);
    if (isSignedUp) navigate(Path.SIGN_IN);
  }, [isLoggedIn, isSignedUp]);

  return (
    <form onSubmit={formik.handleSubmit} className={style.formContainer}>
      <Paper className={style.paper}>
        <FormControl className={style.formItems}>
          <h1 className={style.title}>Sing Up</h1>

          <TextField
            variant="standard"
            sx={{ m: 2, mt: 5 }}
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

          <Password
            label="Confirm password"
            passError={errorConfirmPassword}
            formikErrorPass={formik.errors.confirmPassword}
            {...formik.getFieldProps('confirmPassword')}
          />

          <Button type="submit" variant="contained" sx={{ m: 2 }}>
            Sing Up
          </Button>

          <p className={style.infoText}>Already have an account?</p>

          <Link to={Path.SIGN_IN} className={style.link}>
            Sign In
          </Link>
        </FormControl>
      </Paper>
    </form>
  );
};
