import React, { ReactElement } from 'react';

import loading from 'assets/gifs/loading.gif';
import style from 'components/common/loading/Loading.module.scss';

export const Loading = (): ReactElement => {
  return (
    <div className={style.loading}>
      <img src={loading} alt="loading..." className={style.loadingImg} />
    </div>
  );
};
