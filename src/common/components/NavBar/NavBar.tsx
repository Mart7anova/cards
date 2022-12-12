import React, { ReactElement } from 'react';

import { AppBar, Box, Button, Container } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

import { useAppSelector } from '../../hooks/useAppSelector';
import { ProfileLink } from '../ProfileLink/ProfileLink';
import style from '../ProfileLink/ProfileLink.module.scss';

import c from './NavBar.module.scss';

import { Path } from 'common/enums/Path';
import { selectIsLoggedIn } from 'features/auth/selectors';

export const NavBar = (): ReactElement => {
  const navigate = useNavigate();

  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  const signInHandler = (): void => {
    navigate(Path.SIGN_IN);
  };

  return (
    <Box>
      <AppBar position="static" className={c.bar}>
        <Container fixed className={c.container}>
          <Link to={Path.PACKS} className={style.userContainer}>
            <h1 className={style.name}>Cards App</h1>
          </Link>

          <Link to={Path.USERS} className={style.userContainer}>
            <h1 className={style.name}>Users</h1>
          </Link>

          {isLoggedIn ? (
            <ProfileLink />
          ) : (
            <Button color="inherit" size="large" onClick={signInHandler}>
              <h2>Sign in</h2>
            </Button>
          )}
        </Container>
      </AppBar>
    </Box>
  );
};
