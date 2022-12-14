import React, { ReactElement } from 'react';

import { useAppSelector } from 'common/hooks/useAppSelector';
import { Pack } from 'features/user/ProfilePack/Pack/Pack';
import { selectUserProfile } from 'features/user/selectors';

export const ProfilePack = (): ReactElement => {
  const { name, publicCardPacksCount } = useAppSelector(selectUserProfile);

  const havePacks = publicCardPacksCount !== 0;

  return havePacks ? (
    <>
      <h1 style={{ marginBottom: '20px' }}>{name}&apos;s pack list</h1>
      <Pack />
    </>
  ) : (
    <h1 style={{ textAlign: 'center' }}>This user does not have packs.</h1>
  );
};
