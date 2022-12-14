import React, { ReactElement } from 'react';

import { Button } from '@mui/material';

import { CardModal } from 'components/cardModal';
import { useAppDispatch, useModal } from 'hooks';
import { createCard, fetchCards } from 'store/thunks';

type PropsType = {
  packId: string;
  disabled: boolean;
};

export const AddCardButton = ({ packId, disabled }: PropsType): ReactElement => {
  const dispatch = useAppDispatch();

  const { open, openModal, closeModal } = useModal();

  const addNewCard = async (
    question: string,
    answer: string,
    questionImg: string,
  ): Promise<void> => {
    await dispatch(createCard({ packId, question, answer, questionImg }));
    await dispatch(fetchCards({ packId }));
    closeModal();
  };

  return (
    <>
      <Button variant="contained" onClick={openModal} disabled={disabled}>
        <h4>Add new card</h4>
      </Button>

      <CardModal
        title="Add new card"
        sentChanges={addNewCard}
        open={open}
        closeModal={closeModal}
      />
    </>
  );
};
