import React, { ReactElement } from 'react';

import { Container, Skeleton } from '@mui/material';

import style from './LearnPageSkeleton.module.scss';

export const LearnPageSkeleton = (): ReactElement => {
  return (
    <Container fixed className={style.learnContainer}>
      <Skeleton
        animation="pulse"
        height={300}
        width={450}
        className={style.learnSkeleton}
      />
    </Container>
  );
};
