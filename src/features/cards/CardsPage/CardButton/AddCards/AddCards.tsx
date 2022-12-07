import React from 'react';
import {Button} from '@mui/material';
import {CardModal} from '../../../CardModal/CardModal';
import {useModal} from '../../../../../common/hooks/useModal';
import {useAppDispatch} from '../../../../../common/hooks/useAppDispatch';
import {createCard, fetchCards} from "../../../slice";

type PropsType = {
    packId: string
    disabled: boolean
}

export const AddCards = ({packId, disabled}:PropsType) => {
    const dispatch = useAppDispatch()
    const {open, openModal, closeModal} = useModal();

    const addNewCard = async (question: string, answer: string, questionImg: string) => {
        await dispatch(createCard({packId, question, answer, questionImg}))
        await dispatch(fetchCards({packId}))
        closeModal()
    }

    return (
        <>
            <Button variant={'contained'} onClick={openModal} disabled={disabled}>
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