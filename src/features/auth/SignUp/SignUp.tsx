import React, { useEffect } from 'react';
import FormControl from '@mui/material/FormControl';
import { useAppDispatch } from 'common/hooks/useAppDispatch';
import { useFormik } from 'formik';
import { validateValuesForForm } from 'common/utils/validateValuesForForm';
import style from 'common/assets/styles/Form.module.scss';
import { Button, Paper, TextField } from '@mui/material';
import { Password } from 'common/components/Password/Password';
import { Link, useNavigate } from 'react-router-dom';
import { PATH } from 'common/enums/path';
import { useAppSelector } from 'common/hooks/useAppSelector';
import { getIsLoggedIn, getIsSignedUp } from '../selectors';
import { signUp } from '../slice';


export const SignUp = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useAppSelector(getIsLoggedIn);
  const isSignedUp = useAppSelector(getIsSignedUp);

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

  const emailError = formik.errors.email && formik.touched.email;
  const passError = formik.errors.password && formik.touched.password;
  const confirmPassError = formik.errors.confirmPassword && formik.touched.confirmPassword;

  useEffect(() => {
    if (isLoggedIn) navigate(PATH.PACKS);
    if (isSignedUp) navigate(PATH.SIGN_IN);
  }, [isLoggedIn, isSignedUp]);

  return (
    <form onSubmit={formik.handleSubmit} className={style.formContainer}>
      <Paper className={style.paper}>
        <FormControl className={style.formItems}>
          <h1 className={style.title}>Sing Up</h1>

          <TextField variant={'standard'}
                     sx={{ m: 2, mt: 5 }}
                     color={emailError ? 'error' : 'primary'}
                     label={emailError ? formik.errors.email : 'Email'}
                     error={!!emailError}
                     {...formik.getFieldProps('email')}
          />

          <Password label={'Password'}
                    passError={passError}
                    formikErrorPass={formik.errors.password}
                    {...formik.getFieldProps('password')}
          />

          <Password label={'Confirm password'}
                    passError={confirmPassError}
                    formikErrorPass={formik.errors.confirmPassword}
                    {...formik.getFieldProps('confirmPassword')}
          />

          <Button type={'submit'} variant={'contained'} sx={{ m: 2 }}>Sing Up</Button>

          <p className={style.infoText}>Already have an account?</p>

          <Link to={PATH.SIGN_IN} className={style.link}>Sign In</Link>
        </FormControl>
      </Paper>
    </form>
  );
};
