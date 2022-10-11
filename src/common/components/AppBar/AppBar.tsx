import React from 'react';
import {AppBar, Box, Button, Toolbar, Typography} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {PATH} from '../../enums/path';
import {useAppSelector} from '../../hooks/useAppSelector';
import {getIsLoggedIn} from '../../../features/auth/selectors';
import {ProfileLink} from '../ProfileLink/ProfileLink';

export const Bar = () => {
    const navigate = useNavigate()
    const isLoggedIn = useAppSelector(getIsLoggedIn)

    const onClickHandler = () => {
        navigate(PATH.SIGN_IN)
    }

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <Typography component="div" sx={{flexGrow: 1}}>
                        <h1>Cards App</h1>
                    </Typography>
                    {
                        isLoggedIn
                            ? <ProfileLink/>

                            : <Button color="inherit" size={'large'} onClick={onClickHandler}>
                                <h2>Sign in</h2>
                            </Button>
                    }
                </Toolbar>
            </AppBar>
        </Box>
    );
};