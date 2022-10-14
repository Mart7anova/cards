import {Avatar, Button, FormControl, Paper} from '@mui/material';
import React from 'react';
import noUserPhoto from '../../assets/images/no-user-photo.png';
import {useAppSelector} from '../../common/hooks/useAppSelector';
import {getProfile} from './selectors';
import {authActions} from '../auth';
import {useAppDispatch} from '../../common/hooks/useAppDispatch';
import {EditableSpan} from '../../common/components/EditableSpan/EditableSpan';
import {profileActions} from './index';
import s from '../../assets/styles/PaperBlock.module.scss';

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
        <form className={s.mainContainer}>
            <Paper className={s.paper}>
                <FormControl className={s.formItems}>

                    <h1>Personal Information</h1>

                    <div className={s.flexContainer}>
                        <Avatar alt={name} src={avatar ? avatar : noUserPhoto} className={s.img}/>
                        <EditableSpan value={name} onChange={onNameChange}/>
                    </div>

                    <p className={s.infoText}> {email} </p>

                    <Button variant={'contained'} sx={{m: 2}} onClick={onClickHandler}>Log out</Button>
                </FormControl>
            </Paper>
        </form>
    );
};
