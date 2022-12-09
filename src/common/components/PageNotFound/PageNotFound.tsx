import React, { ReactElement } from 'react';

import { Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import notFound from '../../assets/images/404.gif';

import style from './PageNotFound.module.scss';

import { Path } from 'common/enums/Path';

export const PageNotFound = (): ReactElement => {
  const navigate = useNavigate();

  return (
    <Container className={style.pageContainer}>
      <h1>Error 404</h1>

      <h2>Page not found</h2>

      <Button
        variant="contained"
        size="large"
        className={style.btn}
        onClick={() => navigate(Path.PACKS)}
      >
        go back home
      </Button>

      <img src={notFound} alt=" " />
    </Container>
  );
};
