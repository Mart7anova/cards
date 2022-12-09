import React, { ReactElement } from 'react';

import { Button } from '@mui/material';

import { PackModal } from '../PackModal/PackModal';
import { createNewPack, fetchPacks } from '../slice';

import style from './PackTitle.module.scss';

import { useAppDispatch } from 'common/hooks/useAppDispatch';
import { useModal } from 'common/hooks/useModal';

type PropsType = {
  disabled: boolean;
};

export const PackTitle = ({ disabled }: PropsType): ReactElement => {
  const dispatch = useAppDispatch();

  const { open, openModal, closeModal } = useModal();

  const addNewPack = async (
    name: string,
    isPrivate: boolean,
    deckCover: string,
  ): Promise<void> => {
    await dispatch(createNewPack({ name, isPrivate, deckCover }));
    await dispatch(fetchPacks());
    closeModal();
  };

  return (
    <div className={style.title}>
      <h1>Packs list</h1>

      <Button variant="contained" onClick={openModal} disabled={disabled}>
        <h4>Add new pack</h4>
      </Button>

      <PackModal
        title="Add new pack"
        open={open}
        closeModal={closeModal}
        sentChanges={addNewPack}
      />
    </div>
  );
};
