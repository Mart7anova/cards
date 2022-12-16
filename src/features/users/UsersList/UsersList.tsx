import React, { ReactElement } from 'react';

import { NoResult } from 'common/components/NoResult/NoResult';
import { AppStatus } from 'common/enums/AppStatus';
import { useAppSelector } from 'common/hooks/useAppSelector';
import {
  selectUsers,
  selectUsersPageCount,
  selectUsersStatus,
} from 'features/users/selectors';
import { SkeletonUsers } from 'features/users/UsersList/SkeletonUsers/SkeletonUsers';
import { Users } from 'features/users/UsersList/Users/Users';

export const UsersList = (): ReactElement => {
  const users = useAppSelector(selectUsers);
  const usersStatus = useAppSelector(selectUsersStatus);
  const usersPageCount = useAppSelector(selectUsersPageCount);

  const noPagesCount = !usersPageCount;
  const isUsersLoading = usersStatus === AppStatus.loading || noPagesCount;
  const haveUsers = users !== undefined;

  if (isUsersLoading) {
    return <SkeletonUsers />;
  }

  return haveUsers ? <Users /> : <NoResult />;
};
