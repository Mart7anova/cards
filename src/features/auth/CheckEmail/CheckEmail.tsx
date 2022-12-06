import {Avatar, Button, FormControl, Paper} from '@mui/material';
import React, {useEffect} from 'react';
import checkEmail from '../../../common/assets/images/check-email.png'
import s from '../../../common/assets/styles/Form.module.scss';
import {useAppSelector} from '../../../common/hooks/useAppSelector';
import {getEmail, getIsLoggedIn} from '../selectors';
import {useNavigate} from 'react-router-dom';
import { PATH } from '../../../common/enums/path';

export const CheckEmail = () => {
    const isLoggedIn = useAppSelector(getIsLoggedIn)
    const navigate = useNavigate()
    const email = useAppSelector(getEmail)

    const onClickHandler = () => {
      navigate(PATH.SIGN_IN)
    }

    useEffect(()=>{
        if(isLoggedIn) navigate(PATH.PACKS)
    }, [isLoggedIn])

    return (
        <div className={s.formContainer}>
            <Paper className={s.paper}>
                <FormControl className={s.formItems}>
                    <h1 className={s.title}>Sing In</h1>

                    <div className={s.flexContainer}>
                        <Avatar alt="check email" src={checkEmail} className={s.img}/>
                    </div>

                    <p className={s.helpText} style={{textAlign: 'center'}}>
                        We’ve sent an Email with instructions to {email}
                    </p>

                    <Button variant={'contained'} sx={{m: 2}} onClick={onClickHandler}>Back to login</Button>
                </FormControl>
            </Paper>
        </div>
    );
};
