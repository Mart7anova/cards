import React, { ReactElement } from 'react';

import { Container, Skeleton } from '@mui/material';

import { SkeletonTable } from 'common/components/SkeletonTable/SkeletonTable';

export const CardsPageSkeleton = (): ReactElement => {
  return (
    <Container fixed>
      <Skeleton
        animation="pulse"
        height={40}
        width={150}
        style={{ margin: '40px 0 100px 0' }}
      />
      <SkeletonTable />
    </Container>
  );
};
