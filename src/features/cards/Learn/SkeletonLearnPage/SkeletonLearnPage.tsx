import React, { ReactElement } from 'react';

import { Container, Skeleton } from '@mui/material';

export const SkeletonLearnPage = (): ReactElement => {
  return (
    <Container
      fixed
      style={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: '50px',
      }}
    >
      <Skeleton animation="pulse" height={300} width={450} />
    </Container>
  );
};
