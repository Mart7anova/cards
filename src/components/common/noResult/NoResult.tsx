import React, { ReactElement } from 'react';

import { Paper } from '@mui/material';

import style from 'components/common/noResult/NoResult.module.scss';

export const NoResult = (): ReactElement => {
  return (
    <Paper className={style.paper}>
      <h2 className={style.title}>No result try to use other params.</h2>
    </Paper>
  );
};
