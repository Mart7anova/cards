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
            <SchoolIcon sx={{cursor: 'pointer'}}/>
            {
                packUserId === _id
                    ? <>
                        <BorderColorIcon sx={{ml: 2, mr: 2, cursor: 'pointer'}} onClick={openModal}/>
                        <DeleteForeverIcon sx={{cursor: 'pointer'}} onClick={openEditModal}/>
                    </>
                    : <>
                        <BorderColorIcon sx={{ml: 2, mr: 2}} color={'disabled'}/>
                        <DeleteForeverIcon color={'disabled'}/>
                    </>
            }
            <PackModal title={'Edit pack'}
                       open={open}
                       closeModal={closeModal}
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
