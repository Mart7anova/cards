import {Avatar, Button, FormControl, Paper} from '@mui/material';
import React, {useEffect} from 'react';
import checkEmail from '../../../common/assets/images/check-email.png'
import style from '../../../common/assets/styles/Form.module.scss';
import {useAppSelector} from '../../../common/hooks/useAppSelector';
import {getEmail, getIsLoggedIn} from '../selectors';
import {useNavigate} from 'react-router-dom';
import { PATH } from '../../../common/enums/path';

export const CheckEmail = () => {
    const isLoggedIn = useAppSelector(getIsLoggedIn)
    const navigate = useNavigate()
    const email = useAppSelector(getEmail)

    const loginNavigationHandler = () => {
      navigate(PATH.SIGN_IN)
    }

    useEffect(()=>{
        if(isLoggedIn) navigate(PATH.PACKS)
    }, [isLoggedIn])

    return (
        <div className={style.formContainer}>
            <Paper className={style.paper}>
                <FormControl className={style.formItems}>
                    <h1 className={style.title}>Sing In</h1>

                    <div className={style.flexContainer}>
                        <Avatar alt="check email" src={checkEmail} className={style.img}/>
                    </div>

                    <p className={style.helpText} style={{textAlign: 'center'}}>
                        We’ve sent an Email with instructions to {email}
                    </p>

                    <Button variant={'contained'} sx={{m: 2}} onClick={loginNavigationHandler}>Back to login</Button>
                </FormControl>
            </Paper>
        </div>
    );
};
