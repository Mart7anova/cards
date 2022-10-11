import React from 'react';
import {useFormik} from 'formik';
import {useAppDispatch} from '../../../common/hooks/useAppDispatch';
import {authActions} from '../index';
import FormControl from '@mui/material/FormControl';
import {validateValuesForForm} from '../../../common/utils/validateValuesForForm';
import {Button, Paper, TextField} from '@mui/material';
import s from './SignIn.module.scss'
import {Password} from '../../../common/components/Password';


const {signIn} = authActions

export const SignIn = () => {
    const dispatch = useAppDispatch()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        validate: values => {
            return validateValuesForForm(values)
        },
        onSubmit: values => {
            dispatch(signIn(values))
        },
    });

    const emailError = formik.errors.email && formik.touched.email
    const passError = formik.errors.password && formik.touched.password

    return (
        <form onSubmit={formik.handleSubmit} className={s.formContainer}>
            <Paper sx={{m: 10, width: '50ch'}}>
                <FormControl sx={{p: 2, display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>

                    <h1 className={s.title}>Sing In</h1>

                     <TextField variant={'standard'}
                               sx={{m:2, mt: 5}}
                               color={emailError ? 'error': 'primary'}
                               label={emailError ? formik.errors.email : 'Email'}
                               error={!!emailError}
                                {...formik.getFieldProps('email')}
                    />

                    <Password passError={passError} formikErrorPass={formik.errors.password} {...formik.getFieldProps('password')}/>

                    <Button type={'submit'} variant={'contained'} sx={{m: 2}}>sent</Button>

                    <p className={s.textInfo}>Do not have account?</p>
                </FormControl>
            </Paper>
        </form>
    );
};
