import React, {useEffect} from 'react';
import FormControl from '@mui/material/FormControl';
import {useAppDispatch} from '../../../common/hooks/useAppDispatch';
import {useFormik} from 'formik';
import {validateValuesForForm} from '../../../common/utils/validateValuesForForm';
import s from '../../../common/styles/Form.module.scss'
import {Button, Paper, TextField} from '@mui/material';
import {authActions} from '../index';
import { Password } from '../../../common/components/Password/Password';
import {Link, useNavigate} from 'react-router-dom';
import {PATH} from '../../../common/enums/path';
import {useAppSelector} from '../../../common/hooks/useAppSelector';
import {getIsLoggedIn} from '../selectors';

const {signUp} = authActions

export const SignUp = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const isLoggedIn = useAppSelector(getIsLoggedIn)

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

    useEffect(()=>{
        if(isLoggedIn) navigate(PATH.PACKS)
    }, [isLoggedIn])

    return (
        <form onSubmit={formik.handleSubmit} className={s.formContainer}>
            <Paper className={s.paper}>
                <FormControl className={s.formItems}>

                    <h1 className={s.title}>Sing Up</h1>

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

                    <Link to={PATH.SIGN_IN} className={s.link}>Sign In</Link>
                </FormControl>
            </Paper>
        </form>
    );
};
