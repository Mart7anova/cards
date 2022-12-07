import React, {ChangeEvent} from 'react';
import style from './UploadFile.module.scss';
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

    const fileUploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
        uploadFile({files: e.target.files, dispatch, setFile})
    }

    return (
        <>
            {
                file && <div className={style.imgContainer}>
                <img src={file} className={style.img} alt={'images are broken'}/>
                <ClearRoundedIcon className={style.iconClose} onClick={() => setFile('')}/>
            </div>
            }

            <div>
                <label className={style.uploadItem}>
                    <input type="file"
                           onChange={fileUploadHandler}
                           accept={'.png, .jpg, .jpeg'}
                    />

                    <Button variant="contained" component="span" className={style.btn}>
                        {file ? 'edit ' : 'add '}{titleForBtn}
                    </Button>
                </label>
            </div>
        </>
    );
};
