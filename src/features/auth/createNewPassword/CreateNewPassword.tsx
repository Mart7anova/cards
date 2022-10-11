import React, {useEffect} from 'react';
import {useAppSelector} from '../../../common/hooks/useAppSelector';
import {getIsLoggedIn, getIsSignedUp} from '../selectors';
import {PATH} from '../../../common/enums/path';
import {useNavigate, useParams} from 'react-router-dom';
import {useFormik} from 'formik';
import {validateValuesForForm} from '../../../common/utils/validateValuesForForm';
import {useAppDispatch} from '../../../common/hooks/useAppDispatch';
import {authActions} from '../index';
import s from '../../../assets/styles/Form.module.scss';
import {Button, Paper} from '@mui/material';
import FormControl from '@mui/material/FormControl';
import {Password} from '../../../common/components/Password/Password';

const {updatePassword} = authActions

export const CreateNewPassword = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const {token} = useParams()

    const isLoggedIn = useAppSelector(getIsLoggedIn)
    const isSignedUp = useAppSelector(getIsSignedUp)

    const formik = useFormik({
        initialValues: {
            password: '',
            confirmPassword: ''
        },
        validate: values => {
            return validateValuesForForm(values)
        },
        onSubmit: values => {
            if (token) {
                dispatch(updatePassword({password: values.password, token}))
            }
        },
    });

    const passError = formik.errors.password && formik.touched.password
    const ConfirmPassError = formik.errors.confirmPassword && formik.touched.confirmPassword

    useEffect(() => {
        if (isLoggedIn) navigate(PATH.PACKS)
        if (isSignedUp) navigate(PATH.SIGN_IN)
    }, [isLoggedIn, isSignedUp])

    return (
        <form onSubmit={formik.handleSubmit} className={s.formContainer}>
            <Paper className={s.paper}>
                <FormControl className={s.formItems}>

                    <h1 className={s.title}>Create new password</h1>

                    <Password label={'Password'}
                              passError={passError}
                              formikErrorPass={formik.errors.password}
                              {...formik.getFieldProps('password')}/>
                    <Password label={'Confirm password'}
                              passError={ConfirmPassError}
                              formikErrorPass={formik.errors.confirmPassword}
                              {...formik.getFieldProps('confirmPassword')}/>


                    <Button type={'submit'} variant={'contained'} sx={{m: 2}}>Create new password</Button>

                </FormControl>
            </Paper>
        </form>
    );
};

