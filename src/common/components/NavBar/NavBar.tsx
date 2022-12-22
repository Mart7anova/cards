import React, { ReactElement } from 'react';

import { AppBar, Box, Container } from '@mui/material';

import { useAppSelector } from '../../hooks/useAppSelector';

import c from './NavBar.module.scss';

import { NavLink } from 'common/components/NavBar/NavLink/NavLink';
import { Path } from 'common/enums/Path';
import { selectIsLoggedIn } from 'features/auth/selectors';

export const NavBar = (): ReactElement => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  return (
    <Box>
      <AppBar position="static" className={c.bar}>
        <Container fixed className={c.container}>
          <NavLink link={Path.PACKS} title="Packs" />

          <NavLink link={Path.CHAT} title="Chat" />

          <NavLink link={Path.USERS} title="Users" />

          {isLoggedIn ? (
            <NavLink link={Path.PROFILE} title="My profile" />
          ) : (
            <NavLink link={Path.SIGN_IN} title="Sign in" />
          )}
        </Container>
      </AppBar>
    </Box>
  );
};
