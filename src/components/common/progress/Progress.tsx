import React, { ReactElement } from 'react';

import { CircularProgress } from '@mui/material';

import style from 'components/common/progress/Progress.module.scss';

export const Progress = (): ReactElement => {
  return (
    <div className={style.progress}>
      <CircularProgress />
    </div>
  );
};
