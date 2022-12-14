import React, { ReactElement, useEffect } from 'react';

import { Container } from '@mui/material';
import { Link, useParams } from 'react-router-dom';

import { Loading } from 'common/components/Loading/Loading';
import { AppStatus } from 'common/enums/AppStatus';
import { Path } from 'common/enums/Path';
import { useAppDispatch } from 'common/hooks/useAppDispatch';
import { useAppSelector } from 'common/hooks/useAppSelector';
import { selectPacksStatus } from 'features/packs/selectors';
import { ProfilePack } from 'features/user/ProfilePack/ProfilePack';
import { selectUserProfile, selectUserProfileStatus } from 'features/user/selectors';
import { fetchUser } from 'features/user/slice';
import { UserProfile } from 'features/user/userProfile/UserProfile';

export const User = (): ReactElement => {
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
          <UserProfile />
          <ProfilePack />
        </>
      ) : (
        <Link to={Path.PAGE_NOT_FOUND} />
      )}
    </Container>
  );
};
