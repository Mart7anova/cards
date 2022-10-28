import React, {ChangeEvent} from 'react';
import s from './UploadFile.module.scss';
import {Button} from '@mui/material';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import {uploadFile} from '../../utils/uploadFile';

type PropsType = {
    file: string
    setFile: (file: string) => void
    titleForBtn: string
}

export const UploadFile = ({file, setFile, titleForBtn}: PropsType) => {
    const dispatch = useAppDispatch()

    const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
        uploadFile({files: e.target.files, dispatch, setFile})
    }

    return (
        <>
            {file && <div className={s.imgContainer}>
                <img src={file} className={s.img} alt={'images are broken'}/>
                <ClearRoundedIcon className={s.iconClose} onClick={() => setFile('')}/>
            </div>}

            <div>
                <label className={s.uploadItem}>
                    <input type="file"
                           onChange={uploadHandler}
                           accept={'.png, .jpg, .jpeg'}
                    />
                    <Button variant="contained" component="span" className={s.btn}>
                        {file ? 'edit ' : 'add '}{titleForBtn}
                    </Button>
                </label>
            </div>
        </>
    );
};
