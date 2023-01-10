import React, { ReactElement } from 'react';

import { AppBar, Box, Container } from '@mui/material';

import { NavLink } from 'components/common';
import c from 'components/navBar/NavBar.module.scss';
import { Path } from 'enums';
import { useAppSelector } from 'hooks';
import { selectIsLoggedIn } from 'store/selectors';

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
