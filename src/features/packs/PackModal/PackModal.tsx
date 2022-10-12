import React, {ChangeEvent, useState} from 'react';
import s from './PackModal.module.scss'
import {Button, Checkbox, FormControlLabel, TextField} from '@mui/material';
import { BasicModal } from '../../../common/components/BasicModal/BasicModal';


type PropsType = {
    title: string
    open: boolean
    closeModal: () => void
    sentChanges: (packName: string, isPrivate: boolean) => void
}

export const PackModal = ({title, open, closeModal, sentChanges}: PropsType) => {
    const [name, setName] = useState('')
    const [isPrivate, setIsPrivate] = useState(false)
    const [error, setError] = useState('')

    const onNameChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setName(e.currentTarget.value)
    }
    const onPrivateChange = (e: ChangeEvent<HTMLInputElement>) => {
        setIsPrivate(e.currentTarget.checked)
    }

    const onClickHandler = () => {
        if (name) {
            const newName = name.trim()
            sentChanges(newName, isPrivate)
            setName('')
            setError('')
        } else {
            setError('required field')
        }
    }

    return (
        <BasicModal open={open} closeModal={closeModal} title={title}>
            <div className={s.infoText}>
                Question:
                {error && <span className={s.errorText}> {error}</span>}
            </div>
            <TextField variant={'standard'}
                       value={name}
                       onChange={onNameChange}
                       error={!!error}
                       style={{width: '100%', marginBottom: '10px'}}
            />
            <FormControlLabel control={<Checkbox checked={isPrivate} onChange={onPrivateChange}/>}
                              label={'Private pack'}
                              style={{marginTop: '20px', marginBottom: '20px'}}
            />
            <div className={s.btnGroup}>
                <Button onClick={closeModal} variant={'contained'} color={'error'}>Cansel</Button>
                <Button onClick={onClickHandler} variant={'contained'}>{title.split(' ')[0]}</Button>
            </div>
        </BasicModal>
    );
};
