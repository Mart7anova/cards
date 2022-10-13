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
        closeEditModal()
    }

    const deletePackHandle = async () => {
        await dispatch(deletePack({id: packId}))
        await dispatch(fetchPacks())
        closeModal()
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
                            <IconButton onClick={openEditModal}><BorderColorIcon/></IconButton>
                        </Tooltip>
                        <Tooltip title="delete">
                            <IconButton onClick={openModal}><DeleteForeverIcon/></IconButton>
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
                       open={openEdit}
                       closeModal={closeEditModal}
                       packName={packName}
                       sentChanges={updatePackHandle}
            />
            <DeleteModal title={'Delete pack'}
                         isPack
                         deleteItem={deletePackHandle}
                         itemName={packName}
                         open={open}
                         closeModal={closeModal}
            />
        </>
    );
};
