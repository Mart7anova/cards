import React, {useEffect} from 'react';
import {useFormik} from 'formik';
import {useAppDispatch} from '../../../common/hooks/useAppDispatch';
import {authActions} from '../index';
import FormControl from '@mui/material/FormControl';
import {validateValuesForForm} from '../../../common/utils/validateValuesForForm';
import {Button, Checkbox, FormControlLabel, Paper, TextField} from '@mui/material';
import s from '../../../common/styles/Form.module.scss'
import {Password} from '../../../common/components/Password/Password';
import {PATH} from '../../../common/enums/path';
import {Link, useNavigate} from 'react-router-dom';
import {useAppSelector} from '../../../common/hooks/useAppSelector';
import {getIsLoggedIn} from '../selectors';


const {signIn} = authActions

export const SignIn = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const isLoggedIn = useAppSelector(getIsLoggedIn)

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

    useEffect(() => {
        if (isLoggedIn) navigate(PATH.PACKS)
    }, [isLoggedIn])

    return (
        <form onSubmit={formik.handleSubmit} className={s.formContainer}>
            <Paper className={s.paper}>
                <FormControl className={s.formItems}>

                    <h1 className={s.title}>Sing In</h1>

                    <TextField variant={'standard'}
                               sx={{m: 2}}
                               color={emailError ? 'error' : 'primary'}
                               label={emailError ? formik.errors.email : 'Email'}
                               error={!!emailError}
                               {...formik.getFieldProps('email')}
                    />

                    <Password passError={passError}
                              formikErrorPass={formik.errors.password} {...formik.getFieldProps('password')}/>

                    <FormControlLabel label={'Remember me'}
                                      sx={{m: 1}}
                                      control={<Checkbox{...formik.getFieldProps('rememberMe')}/>}
                    />

                    <Button type={'submit'} variant={'contained'} sx={{m: 2}}>Sent</Button>

                    <p className={s.textInfo}>Do not have account?</p>

                    <Link to={PATH.SIGN_UP} className={s.link}>Sign Up</Link>
                </FormControl>
            </Paper>
        </form>
    );
};
