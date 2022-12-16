import React, { ReactElement } from 'react';

import { selectProfile } from '../../../profile/selectors';
import { selectPackDeckCover, selectPackName, selectPackUserId } from '../../selectors';
import style from '../CardsPage.module.scss';

import { CardMenu } from './CardMenu/CardMenu';

import { useAppSelector } from 'common/hooks/useAppSelector';
import { addAlternateSrc } from 'common/utils/addAlternateSrc';

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
