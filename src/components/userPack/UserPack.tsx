import React, { ReactElement } from 'react';

import { Pack } from 'components/userPack/pack/Pack';
import { useAppSelector } from 'hooks';
import { selectUserProfile } from 'store/selectors';

export const UserPack = (): ReactElement => {
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
