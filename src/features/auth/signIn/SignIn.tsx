import React, {useState} from 'react';
import {useFormik} from 'formik';
import {useAppDispatch} from '../../../common/hooks/useAppDispatch';
import {authActions} from '../index';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const {signIn} = authActions

type FormikErrorsType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

export const SignIn = () => {
    const dispatch = useAppDispatch()

    const [showPass, setShowPass] = useState(false)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: values => {
            const errors: FormikErrorsType = {}
            if (!values.email) {
                errors.email = 'email required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }
            if (!values.password) {
                errors.password = 'password required';
            } else if (values.password.length < 3) {
                errors.password = 'The password is too short'
            } else if (values.password.length < 8) {
                errors.password = 'Put more then 8 symbols, please.'
            }
            return errors
        },
        onSubmit: (values) => {
            dispatch(signIn(values))
        },
    });
    return (
        <FormControl sx={{m: 1, width: '25ch'}} variant="standard">
            <InputLabel
                color={formik.errors.password ? 'error' : 'primary'}>{formik.errors.password || 'Password'}</InputLabel>
            <Input type={showPass ? 'text' : 'password'}
                   aria-label={'gfhfg'}
                   error={!!formik.errors.password}
                   {...formik.getFieldProps('password')}
                   endAdornment={
                       <InputAdornment position="end">
                           <IconButton
                               aria-label="toggle password visibility"
                               onClick={() => setShowPass(!showPass)}
                           >
                               {showPass ? <VisibilityOff/> : <Visibility/>}
                           </IconButton>
                       </InputAdornment>
                   }
            />
        </FormControl>
    );
};
