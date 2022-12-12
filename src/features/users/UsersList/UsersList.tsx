import React, { ReactElement } from 'react';

import { NoResult } from 'common/components/NoResult/NoResult';
import { AppStatus } from 'common/enums/AppStatus';
import { useAppSelector } from 'common/hooks/useAppSelector';
import { selectUsers, selectUsersStatus } from 'features/users/selectors';
import { SkeletonUsers } from 'features/users/UsersList/SkeletonUsers/SkeletonUsers';
import { Users } from 'features/users/UsersList/Users/Users';

export const UsersList = (): ReactElement => {
  const users = useAppSelector(selectUsers);
  const usersStatus = useAppSelector(selectUsersStatus);

  const HAVE_USERS = !!users.length;
  const IS_USERS_LOADING = usersStatus === AppStatus.loading;

  if (IS_USERS_LOADING) {
    return <SkeletonUsers />;
  }

  return HAVE_USERS ? <Users /> : <NoResult />;
};
