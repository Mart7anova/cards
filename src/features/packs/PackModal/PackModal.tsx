import React, {ChangeEvent, useState} from 'react';
import s from './PackModal.module.scss'
import {Button, Checkbox, FormControlLabel, TextField} from '@mui/material';
import {BasicModal} from '../../../common/components/BasicModal/BasicModal';
import {UploadFile} from '../../../common/components/UploadFile/UploadFile';


type PropsType = {
    title: string
    packName?: string
    deckCover?: string
    open: boolean
    closeModal: () => void
    sentChanges: (packName: string, isPrivate: boolean, file: string) => void
}

export const PackModal = ({title, deckCover, packName, open, closeModal, sentChanges}: PropsType) => {

    const [name, setName] = useState(packName ? packName : '')
    const [isPrivate, setIsPrivate] = useState(false)
    const [file, setFile] = useState(deckCover ? deckCover : '')
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
            sentChanges(newName, isPrivate, file)

            setName('')
            setError('')
            setFile('')
        } else {
            setError('required field')
        }
    }

    return (
        <BasicModal open={open} closeModal={closeModal} title={title}>
            <div className={s.infoText}>
                Name:
                {error && <span className={s.errorText}> {error}</span>}
            </div>
            <TextField variant={'standard'}
                       value={name}
                       onChange={onNameChange}
                       error={!!error}
                       style={{width: '100%', marginBottom: '10px'}}
            />

            <UploadFile file={file} setFile={setFile} titleForBtn={'a cover'}/>

            <FormControlLabel control={<Checkbox checked={isPrivate} onChange={onPrivateChange}/>}
                              label={'Private pack'}
                              className={s.checkboxItem}
            />

            <div className={s.btnGroup}>
                <Button onClick={closeModal} variant={'contained'} color={'error'}>Cansel</Button>
                <Button onClick={onClickHandler} variant={'contained'}>{title.split(' ')[0]}</Button>
            </div>
        </BasicModal>
    );
};
