import React, { ReactElement } from 'react';

import { CardMenu } from 'components/cards/cardMenu';
import style from 'components/cards/Cards.module.scss';
import { useAppSelector } from 'hooks';
import {
  selectPackDeckCover,
  selectPackName,
  selectPackUserId,
  selectProfile,
} from 'store/selectors';
import { addAlternateSrc } from 'utils';

export const CardTitle = (): ReactElement => {
  const packName = useAppSelector(selectPackName);
  const packUserId = useAppSelector(selectPackUserId);
  const packDeckCover = useAppSelector(selectPackDeckCover);
  const { _id } = useAppSelector(selectProfile);

  const isOwner = packUserId === _id;

  return (
    <h1 className={style.titleName}>
      {packName}

      {isOwner && <CardMenu />}

      {packDeckCover && (
        <img
          src={packDeckCover}
          className={style.img}
          onError={addAlternateSrc}
          alt={' '}
        />
      )}
    </h1>
  );
};
