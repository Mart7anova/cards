import React, { ChangeEvent, ReactElement, useEffect, useState } from 'react';

import { Button, Checkbox, FormControlLabel, TextField } from '@mui/material';

import style from './PackModal.module.scss';

import { BasicModal } from 'common/components/BasicModal/BasicModal';
import { UploadFile } from 'common/components/UploadFile/UploadFile';

type PropsType = {
  title: string;
  packName?: string;
  deckCover?: string;
  open: boolean;
  closeModal: () => void;
  sentChanges: (packName: string, isPrivate: boolean, file: string) => void;
};

export const PackModal = ({
  title,
  deckCover,
  packName,
  open,
  closeModal,
  sentChanges,
}: PropsType): ReactElement => {
  const [name, setName] = useState(packName || '');
  const [isPrivate, setIsPrivate] = useState(false);
  const [file, setFile] = useState(deckCover || '');
  const [error, setError] = useState('');

  useEffect(() => {
    if (deckCover) setFile(deckCover);
    if (packName) setName(packName);
  }, [deckCover, packName]);

  const nameChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    setName(e.currentTarget.value);
  };

  const privateChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setIsPrivate(e.currentTarget.checked);
  };

  const packSaveHandler = (): void => {
    if (name) {
      const newName = name.trim();

      sentChanges(newName, isPrivate, file);
      setName('');
      setError('');
      setFile('');
    } else {
      setError('required field');
    }
  };

  return (
    <BasicModal open={open} closeModal={closeModal} title={title}>
      <div className={style.infoText}>
        Name:
        {error && <span className={style.errorText}>{error}</span>}
      </div>

      <TextField
        variant="standard"
        value={name}
        onChange={nameChangeHandler}
        error={!!error}
        style={{ width: '100%', marginBottom: '10px' }}
      />

      <UploadFile file={file} setFile={setFile} titleForBtn="a cover" />

      <FormControlLabel
        control={<Checkbox checked={isPrivate} onChange={privateChangeHandler} />}
        label="Private pack"
        className={style.checkboxItem}
      />

      <div className={style.buttonGroup}>
        <Button onClick={closeModal} variant="contained" color="error">
          Cansel
        </Button>
        <Button onClick={packSaveHandler} variant="contained">
          {title.split(' ')[0]}
        </Button>
      </div>
    </BasicModal>
  );
};
