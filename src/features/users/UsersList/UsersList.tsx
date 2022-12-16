import React, { ReactElement } from 'react';

import { NoResult } from 'common/components/NoResult/NoResult';
import { useAppSelector } from 'common/hooks/useAppSelector';
import { selectUsers } from 'features/users/selectors';
import { Users } from 'features/users/UsersList/Users/Users';

export const UsersList = (): ReactElement => {
  const users = useAppSelector(selectUsers);

  const haveUsers = users !== undefined;

  return haveUsers ? <Users /> : <NoResult />;
};
