import React, { ReactElement } from 'react';

import { Paper } from '@mui/material';

export const NoResult = (): ReactElement => {
  return (
    <Paper style={{ padding: '15px' }}>
      <h2 style={{ color: '#d33131', textAlign: 'center' }}>
        No result try to use other params.
      </h2>
    </Paper>
  );
};
