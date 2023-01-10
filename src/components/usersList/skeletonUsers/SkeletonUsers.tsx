import React, { ReactElement } from 'react';

import { Skeleton } from '@mui/material';

import style from './SkeletonUsers.module.scss';

const LENGTH_ARRAY = 8;

const NUMBERS_ARRAY: number[] = [];

for (let index = 0; index < LENGTH_ARRAY; index += 1) {
  NUMBERS_ARRAY.push(index);
}

export const SkeletonUsers = (): ReactElement => {
  return (
    <div className={style.skeletonContainer}>
      {NUMBERS_ARRAY.map(element => (
        <Skeleton
          key={element}
          variant="rectangular"
          width="100%"
          className={style.skeleton}
        >
          <div className={style.indent} />
        </Skeleton>
      ))}
    </div>
  );
};
