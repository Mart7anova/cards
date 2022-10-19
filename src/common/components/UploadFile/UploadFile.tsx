import React, {ChangeEvent, useState} from 'react';
import s from './UploadFile.module.scss';
import {Button} from '@mui/material';
import {convertFileToBase64} from '../../utils/convertFileToBase64';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {appActions} from '../../../features/application';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';

const {setAppError} = appActions

export const UploadFile = () => {
    const dispatch = useAppDispatch()

    const [file, setFile] = useState('')

    const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0]
            console.log('file: ', file)

            if (file.size < 4000000) {
                convertFileToBase64(file, (file64: string) => {
                    console.log('file64: ', file64)
                    setFile(file64 as string)
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
                <ClearRoundedIcon className={s.iconClose} onClick={()=>setFile('')}/>
            </div>}

            <label className={s.uploadItem}>
                <input type="file"
                       onChange={uploadHandler}
                       accept={'.png, .jpg, .jpeg'}
                />

                <Button variant="contained" component="span" className={s.btn}>Add a cover</Button>
            </label>
        </>
    );
};
