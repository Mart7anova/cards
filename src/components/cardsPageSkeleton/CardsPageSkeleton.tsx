import React, { ReactElement } from 'react';

import { Container, Skeleton } from '@mui/material';

import style from 'components/cardsPageSkeleton/CardsPageSkeleton.module.scss';
import { SkeletonTable } from 'components/common';

export const CardsPageSkeleton = (): ReactElement => {
  return (
    <Container fixed>
      <Skeleton
        animation="pulse"
        height={40}
        width={150}
        className={style.skeletonContainer}
      />
      <SkeletonTable />
    </Container>
  );
};
