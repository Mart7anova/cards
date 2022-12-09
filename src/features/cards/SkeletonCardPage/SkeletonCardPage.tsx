import React, { ReactElement } from 'react';

import { Container, Skeleton } from '@mui/material';

import { SkeletonTable } from 'common/components/SkeletonTable/SkeletonTable';

export const SkeletonCardPage = (): ReactElement => {
  return (
    <Container fixed>
      <Skeleton
        animation="pulse"
        height={40}
        width={100}
        style={{ margin: '30px 0 150px 0' }}
      />
      <SkeletonTable />
    </Container>
  );
};
