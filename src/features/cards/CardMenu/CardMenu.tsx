import React, {useState} from 'react';
import {IconButton, MenuItem, MenuList, Paper, Tooltip} from '@mui/material';
import s from './CardMenu.module.scss';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {PackModal} from '../../packs/PackModal/PackModal';
import {DeleteModal} from '../../../common/components/DeleteModel/DeleteModal';
import {useModal} from '../../../common/hooks/useModal';
import {useAppDispatch} from '../../../common/hooks/useAppDispatch';
import {packActions} from '../../packs';
import {cardActions} from '../index';
import {PATH} from '../../../common/enums/path';
import { useNavigate } from 'react-router-dom';

const {deletePack, updatePack} = packActions
const {fetchCards}=cardActions

type PropsType = {
    packId: string
    packName: string
}

export const CardMenu = ({packId,packName}:PropsType) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [openMenu, setOpenMenu] = useState(false)
    const {open, openModal, closeModal} = useModal();
    const {openEdit, openEditModal, closeEditModal} = useModal();

    const onClickHandler = () => {
        setOpenMenu(!openMenu)
    }

    const updatePackHandle = async (packName: string, isPrivate: boolean) => {
        setOpenMenu(false)
        await dispatch(updatePack({id: packId, name: packName, isPrivate}))
        await dispatch(fetchCards({packId}))
        closeEditModal()
    }

    const deletePackHandle = async () => {
        await dispatch(deletePack({id: packId}))
        closeModal()
        navigate(PATH.PACKS)
    }

    return (
        <>
            <Tooltip title="open menu" className={s.iconMenu} onClick={onClickHandler}>
                <IconButton>
                    <MoreVertIcon/>
                </IconButton>
            </Tooltip>
            {
                openMenu && <Paper className={s.menu}>
                    <MenuList>
                        <MenuItem onClick={openEditModal}>
                            <BorderColorIcon sx={{height: 20}}/>
                            <p className={s.menuText}>Edit</p>
                        </MenuItem>
                        <MenuItem onClick={openModal}>
                            <DeleteForeverIcon sx={{height: 22}}/>
                            <p className={s.menuText}>Delete</p>
                        </MenuItem>
                    </MenuList>
                </Paper>
            }
            <PackModal title={'Edit pack'}
                       open={openEdit}
                       closeModal={closeEditModal}
                       packName={packName}
                       sentChanges={updatePackHandle}
            />
            <DeleteModal title={'Delete card'}
                         isPack
                         deleteItem={deletePackHandle}
                         itemName={packName}
                         open={open}
                         closeModal={closeModal}
            />
        </>
    );
};
