import React, { ReactElement, useEffect } from 'react';

import { Container } from '@mui/material';
import { Link, useParams } from 'react-router-dom';

import { Loading } from 'components/common';
import { UserInfo } from 'components/userInfo';
import { UserPack } from 'components/userPack';
import { AppStatus, Path } from 'enums';
import { useAppDispatch, useAppSelector } from 'hooks';
import {
  selectPacksStatus,
  selectUserProfile,
  selectUserProfileStatus,
} from 'store/selectors';
import { fetchUser } from 'store/thunks';

export const UserProfilePage = (): ReactElement => {
  const dispatch = useAppDispatch();

  const { userId } = useParams() as { userId: string };

  const user = useAppSelector(selectUserProfile);
  const userProfileStatus = useAppSelector(selectUserProfileStatus);
  const packsStatus = useAppSelector(selectPacksStatus);

  const haveUserProfile = user !== undefined;
  const isUserProfileLoading = (userProfileStatus || packsStatus) === AppStatus.loading;

  useEffect(() => {
    dispatch(fetchUser(userId));
  }, [userId]);

  if (isUserProfileLoading) {
    return <Loading />;
  }

  return (
    <Container fixed>
      {haveUserProfile ? (
        <>
          <UserInfo />
          <UserPack />
        </>
      ) : (
        <Link to={Path.PAGE_NOT_FOUND} />
      )}
    </Container>
  );
};
