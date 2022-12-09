import React, { ReactElement, useEffect } from 'react';

import { Button, Paper } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import { useFormik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';

import style from '../../../common/assets/styles/Form.module.scss';
import { selectIsLoggedIn, selectIsSignedUp } from '../selectors';
import { updatePassword } from '../slice';

import { Password } from 'common/components/Password/Password';
import { Path } from 'common/enums/Path';
import { useAppDispatch } from 'common/hooks/useAppDispatch';
import { useAppSelector } from 'common/hooks/useAppSelector';
import { validateValuesForForm } from 'common/utils/validateValuesForForm';

export const CreateNewPassword = (): ReactElement => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const { token } = useParams();

  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const isSignedUp = useAppSelector(selectIsSignedUp);

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validate: values => {
      return validateValuesForForm(values);
    },
    onSubmit: values => {
      if (token) {
        dispatch(updatePassword({ password: values.password, token }));
      }
    },
  });

  const ERROR_PASSWORD = formik.errors.password && formik.touched.password;
  const ERROR_CONFIRM_PASSWORD =
    formik.errors.confirmPassword && formik.touched.confirmPassword;

  useEffect(() => {
    if (isLoggedIn) navigate(Path.PACKS);
    if (isSignedUp) navigate(Path.SIGN_IN);
  }, [isLoggedIn, isSignedUp]);

  return (
    <form onSubmit={formik.handleSubmit} className={style.formContainer}>
      <Paper className={style.paper}>
        <FormControl className={style.formItems}>
          <h1 className={style.title}>Create new password</h1>

          <Password
            label="Password"
            passError={ERROR_PASSWORD}
            formikErrorPass={formik.errors.password}
            {...formik.getFieldProps('password')}
          />

          <Password
            label="Confirm password"
            passError={ERROR_CONFIRM_PASSWORD}
            formikErrorPass={formik.errors.confirmPassword}
            {...formik.getFieldProps('confirmPassword')}
          />

          <Button type="submit" variant="contained" sx={{ m: 2 }}>
            Create new password
          </Button>
        </FormControl>
      </Paper>
    </form>
  );
};
