import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useModal } from 'common/hooks/useModal';
import { CardModal } from '../../../../CardModal/CardModal';
import { DeleteModal } from 'common/components/DeleteModel/DeleteModal';
import { useAppDispatch } from 'common/hooks/useAppDispatch';
import { deleteCard, fetchCards, updateCard } from '../../../../slice';


type PropsType = {
  packId: string
  cardId: string
  cardName: string
  question: string
  questionImg: string
  answer: string
  setIsSearching: (isSearching: boolean) => void
}

export const CardIconsGroup = ({
                                 packId,
                                 cardId,
                                 cardName,
                                 question,
                                 questionImg,
                                 answer,
                                 setIsSearching,
                               }: PropsType) => {
  const dispatch = useAppDispatch();

  const { open, openModal, closeModal } = useModal();
  const { openEdit, openEditModal, closeEditModal } = useModal();

  const cardUpdateHandel = async (question: string, answer: string, questionImg: string) => {
    await dispatch(updateCard({ cardId, question, answer, questionImg }));
    await dispatch(fetchCards({ packId }));
    closeEditModal();
  };
  const cardDeleteHandle = async () => {
    setIsSearching(false);
    await dispatch(deleteCard({ cardId }));
    await dispatch(fetchCards({ packId }));
    closeModal();
  };

  return (
    <>
      <Tooltip title='edit'>
        <IconButton onClick={openEditModal}><BorderColorIcon /></IconButton>
      </Tooltip>

      <Tooltip title='delete'>
        <IconButton onClick={openModal}><DeleteForeverIcon /></IconButton>
      </Tooltip>

      <CardModal title={'Edit card'}
                 cardQuestion={question}
                 cardAnswer={answer}
                 questionImg={questionImg}
                 sentChanges={cardUpdateHandel}
                 open={openEdit}
                 closeModal={closeEditModal}
      />

      <DeleteModal title={'Delete card'}
                   isPack
                   deleteItem={cardDeleteHandle}
                   itemName={cardName}
                   open={open}
                   closeModal={closeModal}
      />
    </>
  );
};
