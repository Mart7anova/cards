import React, { ChangeEvent, ReactElement } from 'react';

import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import { Button } from '@mui/material';

import style from 'components/common/uploadFile/UploadFile.module.scss';
import { useAppDispatch } from 'hooks';
import { uploadFile } from 'utils';

type PropsType = {
  file: string;
  setFile: (file: string) => void;
  titleForBtn: string;
};

export const UploadFile = ({ file, setFile, titleForBtn }: PropsType): ReactElement => {
  const dispatch = useAppDispatch();

  const fileUploadHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    uploadFile({ files: e.target.files, dispatch, setFile });
  };

  return (
    <>
      {file && (
        <div className={style.imgContainer}>
          <img src={file} className={style.img} alt="images are broken" />
          <ClearRoundedIcon className={style.iconClose} onClick={() => setFile('')} />
        </div>
      )}

      <div>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label className={style.uploadItem}>
          <input type="file" onChange={fileUploadHandler} accept=".png, .jpg, .jpeg" />

          <Button variant="contained" component="span" className={style.btn}>
            {file ? 'edit ' : 'add '}
            {titleForBtn}
          </Button>
        </label>
      </div>
    </>
  );
};
