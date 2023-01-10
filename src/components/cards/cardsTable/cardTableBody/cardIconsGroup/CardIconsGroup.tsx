import React, { ReactElement } from 'react';

import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { IconButton, Tooltip } from '@mui/material';

import { CardModal } from 'components/cardModal';
import { DeleteModal } from 'components/common';
import { useAppDispatch, useModal } from 'hooks';
import { deleteCard, fetchCards, updateCard } from 'store/thunks';

type PropsType = {
  packId: string;
  cardId: string;
  question: string;
  questionImg: string;
  answer: string;
  setIsSearching: (isSearching: boolean) => void;
};

export const CardIconsGroup = ({
  packId,
  cardId,
  question,
  questionImg,
  answer,
  setIsSearching,
}: PropsType): ReactElement => {
  const dispatch = useAppDispatch();

  const { open, openModal, closeModal } = useModal();
  const { openEdit, openEditModal, closeEditModal } = useModal();

  const cardUpdateHandel = async (
    question: string,
    answer: string,
    questionImg: string,
  ): Promise<void> => {
    await dispatch(updateCard({ cardId, question, answer, questionImg }));
    await dispatch(fetchCards({ packId }));
    closeEditModal();
  };

  const cardDeleteHandle = async (): Promise<void> => {
    setIsSearching(false);
    await dispatch(deleteCard({ cardId }));
    await dispatch(fetchCards({ packId }));
    closeModal();
  };

  return (
    <>
      <Tooltip title="edit">
        <IconButton onClick={openEditModal}>
          <BorderColorIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title="delete">
        <IconButton onClick={openModal}>
          <DeleteForeverIcon />
        </IconButton>
      </Tooltip>

      <CardModal
        title="Edit card"
        cardQuestion={question}
        cardAnswer={answer}
        questionImg={questionImg}
        sentChanges={cardUpdateHandel}
        open={openEdit}
        closeModal={closeEditModal}
      />

      <DeleteModal
        title="Delete card"
        deleteItem={cardDeleteHandle}
        itemName={question}
        open={open}
        closeModal={closeModal}
      />
    </>
  );
};
