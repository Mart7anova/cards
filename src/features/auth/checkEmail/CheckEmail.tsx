import {Avatar, Button, FormControl, Paper} from '@mui/material';
import React from 'react';
import checkEmail from '../../../assets/images/check-email.png'
import s from '../../../assets/styles/Form.module.scss';
import {useAppSelector} from '../../../common/hooks/useAppSelector';
import {getEmail} from '../selectors';
import {useNavigate} from 'react-router-dom';
import { PATH } from '../../../common/enums/path';

export const CheckEmail = () => {
    const navigate = useNavigate()
    const email = useAppSelector(getEmail)

    const onClickHandler = () => {
      navigate(PATH.SIGN_IN)
    }

    return (
        <div className={s.formContainer}>
            <Paper className={s.paper}>
                <FormControl className={s.formItems}>

                    <h1 className={s.title}>Sing In</h1>

                    <div style={{display:'flex', justifyContent: 'center'}}>
                        <Avatar alt="check email" src={checkEmail} sx={{width: 100, height: 100, m:3}}/>
                    </div>

                    <p className={s.helpText} style={{textAlign: 'center'}}> We’ve sent an Email with instructions to {email} </p>

                    <Button variant={'contained'} sx={{m: 2}} onClick={onClickHandler}>Back to login</Button>
                </FormControl>
            </Paper>
        </div>
    );
};
