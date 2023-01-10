import React, { ReactElement } from 'react';

import { NoResult } from 'components/common';
import { SkeletonUsers } from 'components/usersList/skeletonUsers';
import { Users } from 'components/usersList/users';
import { AppStatus } from 'enums';
import { useAppSelector } from 'hooks';
import { selectUsers, selectUsersPageCount, selectUsersStatus } from 'store/selectors';

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
