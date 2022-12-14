import React, { ReactElement } from 'react';

import style from 'components/usersTitle/UsersTitle.module.scss';

export const UsersTitle = (): ReactElement => {
  return (
    <div className={style.title}>
      <h1>Users</h1>
      <p>Packs</p>
    </div>
  );
};
