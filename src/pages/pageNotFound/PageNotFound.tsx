import React, { ReactElement } from 'react';

import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import notFound from 'assets/gifs/404.gif';
import { Path } from 'enums';
import style from 'pages/pageNotFound/PageNotFound.module.scss';

export const PageNotFound = (): ReactElement => {
  const navigate = useNavigate();

  return (
    <div className={style.mainContainer}>
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

      <img src={notFound} alt="notFound" />
    </div>
  );
};
