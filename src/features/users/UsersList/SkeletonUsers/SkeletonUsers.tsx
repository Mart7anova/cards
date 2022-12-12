import React, { ReactElement } from 'react';

import { Skeleton } from '@mui/material';

const LENGTH_ARRAY = 10;

export const SkeletonUsers = (): ReactElement => {
  const FAKE_ARRAY = [];

  for (let index = 0; index < LENGTH_ARRAY; index += 1) {
    FAKE_ARRAY.push(index);
  }

  return (
    <div style={{ marginTop: '20px' }}>
      {FAKE_ARRAY.map(element => (
        <Skeleton
          key={element}
          variant="rectangular"
          width="100%"
          sx={{ margin: '0 0 2px 0' }}
        >
          <div style={{ paddingTop: '13%' }} />
        </Skeleton>
      ))}
    </div>
  );
};
