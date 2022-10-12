import React from 'react';
import SchoolIcon from '@mui/icons-material/School';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {useAppSelector} from '../../../../common/hooks/useAppSelector';
import {getProfile} from '../../../profile/selectors';
import {useModal} from '../../../../common/hooks/useModal';
import {useAppDispatch} from '../../../../common/hooks/useAppDispatch';
import {DeleteModal} from '../../../../common/components/DeleteModel/DeleteModal';
import {PackModal} from '../../PackModal/PackModal';
import {packActions} from '../../index';
import {IconButton, Tooltip} from '@mui/material';

const {fetchPacks, deletePack, updatePack} = packActions

type PropsType = {
    packUserId: string
    packId: string
    packName: string
}

export const PackIconsGroup = ({packUserId, packId, packName}: PropsType) => {
    const dispatch = useAppDispatch()
    const {_id} = useAppSelector(getProfile)

    const {open, openModal, closeModal} = useModal();
    const {openEdit, openEditModal, closeEditModal} = useModal();

    const updatePackHandle = async (packName: string, isPrivate: boolean) => {
        await dispatch(updatePack({id: packId, name: packName, isPrivate}))
        await dispatch(fetchPacks())
        closeModal()
    }

    const deletePackHandle = async () => {
        await dispatch(deletePack({id: packId}))
        await dispatch(fetchPacks())
        closeEditModal()
    }

    return (
        <>
            <Tooltip title="learn">
                <IconButton><SchoolIcon/></IconButton>
            </Tooltip>

            {
                packUserId === _id
                    ? <>
                        <Tooltip title="edit">
                            <IconButton onClick={openModal}><BorderColorIcon/></IconButton>
                        </Tooltip>
                        <Tooltip title="delete">
                            <IconButton onClick={openEditModal}><DeleteForeverIcon/></IconButton>
                        </Tooltip>
                    </>
                    : <>
                        <IconButton disabled>
                            <BorderColorIcon color={'disabled'}/>
                        </IconButton>
                        <IconButton disabled>
                            <DeleteForeverIcon color={'disabled'}/>
                        </IconButton>
                    </>
            }
            <PackModal title={'Edit pack'}
                       open={open}
                       closeModal={closeModal}
                       packName={packName}
                       sentChanges={updatePackHandle}
            />
            <DeleteModal title={'Delete card'}
                         isPack
                         deleteItem={deletePackHandle}
                         itemName={packName}
                         open={openEdit}
                         closeModal={closeEditModal}
            />
        </>
    );
};
