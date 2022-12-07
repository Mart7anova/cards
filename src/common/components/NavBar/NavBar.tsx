import React from 'react';
import {AppBar, Box, Button, Container} from '@mui/material';
import {Link, useNavigate} from 'react-router-dom';
import {PATH} from '../../enums/path';
import {useAppSelector} from '../../hooks/useAppSelector';
import {getIsLoggedIn} from '../../../features/auth/selectors';
import {ProfileLink} from '../ProfileLink/ProfileLink';
import style from '../ProfileLink/ProfileLink.module.scss';
import c from './NavBar.module.scss';

export const NavBar = () => {
    const navigate = useNavigate()
    const isLoggedIn = useAppSelector(getIsLoggedIn)

    const signInHandler = () => {
        navigate(PATH.SIGN_IN)
    }

    return (
        <Box>
            <AppBar position="static" className={c.bar}>
                <Container fixed className={c.container}>
                    <Link to={PATH.PACKS} className={style.userContainer}>
                        <h1 className={style.name}>Cards App</h1>
                    </Link>

                    {
                        isLoggedIn
                            ? <ProfileLink/>
                            : <Button color="inherit" size={'large'} onClick={signInHandler}>
                                <h2>Sign in</h2>
                            </Button>
                    }
                </Container>
            </AppBar>
        </Box>
    );
};