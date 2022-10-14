import {Avatar, Button, FormControl, Paper} from '@mui/material';
import React from 'react';
import s from '../../assets/styles/Form.module.scss';
import noUserPhoto from '../../assets/images/no-user-photo.png';
import {useAppSelector} from '../../common/hooks/useAppSelector';
import {getProfile} from './selectors';
import {authActions} from '../auth';
import {useAppDispatch} from '../../common/hooks/useAppDispatch';
import {EditableSpan} from '../../common/components/EditableSpan/EditableSpan';
import {profileActions} from './index';

const {signOut} = authActions
const {updateProfile} = profileActions

export const Profile = () => {
    const dispatch = useAppDispatch()
    const {name, avatar, email} = useAppSelector(getProfile)

    const onNameChange = (name: string) => {
        dispatch(updateProfile({name}))
    }

    const onClickHandler = () => {
        dispatch(signOut())
    }

    return (
        <div className={s.formContainer}>
            <Paper className={s.paper}>
                <FormControl className={s.formItems}>

                    <h1 className={s.title}>Personal Information</h1>

                    <div className={s.flexContainer}>
                        <Avatar alt={name} src={avatar ? avatar : noUserPhoto} className={s.img}/>
                        <EditableSpan value={name} onChange={onNameChange}/>
                    </div>

                    <p className={s.infoText} style={{textAlign: 'center'}}> {email} </p>

                    <Button variant={'contained'} sx={{m: 2}} onClick={onClickHandler}>Log out</Button>
                </FormControl>
            </Paper>
        </div>
    );
};
