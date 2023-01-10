import React, { ReactElement } from 'react';

import { Button } from '@mui/material';

import { PackModal } from 'components/packModal';
import style from 'components/packTitle/PackTitle.module.scss';
import { useAppDispatch, useModal } from 'hooks';
import { createNewPack, fetchPacks } from 'store/thunks';

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
