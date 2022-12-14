import React, { ReactElement } from 'react';

import loading from 'common/assets/images/loading.gif';

export const Loading = (): ReactElement => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <img src={loading} alt="loading..." style={{ width: '240px' }} />
    </div>
  );
};
