import React from 'react';
import style from '../CardsPage.module.scss';
import { CardMenu } from '../../CardMenu/CardMenu';
import { addAlternateSrc } from 'common/utils/addAlternateSrc';
import { useAppSelector } from 'common/hooks/useAppSelector';
import { selectPackDeckCover, selectPackName, selectPackUserId } from '../../selectors';
import { selectUserProfile } from '../../../profile/selectors';

export const CardTitle = () => {
  const packName = useAppSelector(selectPackName);
  const packUserId = useAppSelector(selectPackUserId);
  const packDeckCover = useAppSelector(selectPackDeckCover);
  const { _id } = useAppSelector(selectUserProfile);

  const isOwner = packUserId === _id;

  return (
    <h1 className={style.titleName}>
      {packName}
      {
        isOwner && <CardMenu />
      }
      {
        packDeckCover && <img src={packDeckCover}
                              className={style.img}
                              onError={addAlternateSrc}
                              alt={' '} />
      }
    </h1>
  );
};