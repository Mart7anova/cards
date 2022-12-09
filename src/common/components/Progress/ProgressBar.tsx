import React, { ReactElement } from 'react';

import { CircularProgress } from '@mui/material';

export const Progress = (): ReactElement => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '200px' }}>
      <CircularProgress />
    </div>
  );
};
