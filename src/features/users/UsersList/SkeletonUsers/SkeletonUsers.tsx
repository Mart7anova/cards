import React, { ReactElement } from 'react';

import { Skeleton } from '@mui/material';

const LENGTH_ARRAY = 8;

const NUMBERS_ARRAY: number[] = [];

for (let index = 0; index < LENGTH_ARRAY; index += 1) {
  NUMBERS_ARRAY.push(index);
}

export const SkeletonUsers = (): ReactElement => {
  return (
    <div style={{ marginTop: '20px' }}>
      {NUMBERS_ARRAY.map(element => (
        <Skeleton
          key={element}
          variant="rectangular"
          width="100%"
          sx={{ margin: '0 0 2px 0' }}
        >
          <div style={{ paddingTop: '17%' }} />
        </Skeleton>
      ))}
    </div>
  );
};
