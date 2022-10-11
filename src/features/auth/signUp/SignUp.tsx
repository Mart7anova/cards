import React from 'react';
import FormControl from '@mui/material/FormControl';
import {useAppDispatch} from '../../../common/hooks/useAppDispatch';
import {useFormik} from 'formik';
import {validateValuesForForm} from '../../../common/utils/validateValuesForForm';
import s from '../../../common/styles/Form.module.scss'
import {Button, Paper, TextField} from '@mui/material';
import {Password} from '../../../common/components/Password';
import {authActions} from '../index';

const {signUp} = authActions

export const SignUp = () => {
    const dispatch = useAppDispatch()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
            confirmPassword: ''
        },
        validate: values => {
            return validateValuesForForm(values)
        },
        onSubmit: values => {
            dispatch(signUp(values))
        },
    });

    const emailError = formik.errors.email && formik.touched.email
    const passError = formik.errors.password && formik.touched.password
    const ConfirmPassError = formik.errors.confirmPassword && formik.touched.confirmPassword

    return (
        <form onSubmit={formik.handleSubmit} className={s.formContainer}>
            <Paper sx={{m: 10, width: '50ch'}}>
                <FormControl sx={{p: 2, display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>

                    <h1 className={s.title}>Sing In</h1>

                    <TextField variant={'standard'}
                               sx={{m: 2, mt: 5}}
                               color={emailError ? 'error' : 'primary'}
                               label={emailError ? formik.errors.email : 'Email'}
                               error={!!emailError}
                               {...formik.getFieldProps('email')}
                    />

                    <Password passError={passError}
                              formikErrorPass={formik.errors.password} {...formik.getFieldProps('password')}/>
                    <Password passError={ConfirmPassError}
                              formikErrorPass={formik.errors.confirmPassword} {...formik.getFieldProps('confirmPassword')}/>

                    <Button type={'submit'} variant={'contained'} sx={{m: 2}}>Sent</Button>

                    <p className={s.textInfo}>Already have an account?</p>
                </FormControl>
            </Paper>
        </form>
    );
};
