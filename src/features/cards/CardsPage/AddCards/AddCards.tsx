import React from 'react';
import {Button} from '@mui/material';
import {CardModal} from '../../CardModal/CardModal';
import {useModal} from '../../../../common/hooks/useModal';
import {cardActions} from '../../index';
import {useAppDispatch} from '../../../../common/hooks/useAppDispatch';

const {fetchCards, createCard} = cardActions

type PropsType = {
    packId: string
}

export const AddCards = ({packId}:PropsType) => {
    const dispatch = useAppDispatch()
    const {open, openModal, closeModal} = useModal();

    const addNewCard = async (question: string, answer: string) => {
        await dispatch(createCard({packId, question, answer}))
        await dispatch(fetchCards({packId}))
        closeModal()
    }
    return (
        <>
            <Button variant={'contained'} onClick={openModal}>
                <h4>Add new card</h4>
            </Button>
            <CardModal title={'Add new card'}
                       sentChanges={addNewCard}
                       open={open}
                       closeModal={closeModal}
            />
        </>
    );
};