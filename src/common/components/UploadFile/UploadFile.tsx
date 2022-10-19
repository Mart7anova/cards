import React, {ChangeEvent} from 'react';
import s from './UploadFile.module.scss';
import {Button} from '@mui/material';
import {convertFileToBase64} from '../../utils/convertFileToBase64';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {appActions} from '../../../features/application';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';

const {setAppError} = appActions

type PropsType = {
    file: string
    setFile: (file: string) => void
    titleForBtn: string
}

export const UploadFile = ({file, setFile, titleForBtn}: PropsType) => {
    const dispatch = useAppDispatch()

    const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0]

            if (file.size < 4000000) {
                convertFileToBase64(file, (file64: string) => {
                    setFile(file64)
                })
            } else {
                dispatch(setAppError('The file is too large'))
            }
        }
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
