import React from 'react';
import SchoolIcon from '@mui/icons-material/School';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {useAppSelector} from '../../../../common/hooks/useAppSelector';
import {getUserProfile} from '../../../profile/selectors';
import {useModal} from '../../../../common/hooks/useModal';
import {useAppDispatch} from '../../../../common/hooks/useAppDispatch';
import {DeleteModal} from '../../../../common/components/DeleteModel/DeleteModal';
import {PackModal} from '../../PackModal/PackModal';
import {packActions} from '../../index';
import {IconButton, Tooltip} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {PATH} from '../../../../common/enums/path';

const {fetchPacks, deletePack, updatePack} = packActions

type PropsType = {
    packUserId: string
    packId: string
    packName: string
    cardsCount: number
    deckCover: string
}

export const PackIconsGroup = ({packUserId, packId, packName, cardsCount, deckCover}: PropsType) => {
    const dispatch = useAppDispatch()
    const {_id} = useAppSelector(getUserProfile)
    const navigate = useNavigate()

    const {open, openModal, closeModal} = useModal();
    const {openEdit, openEditModal, closeEditModal} = useModal();

    const updatePackHandle = async (packName: string, isPrivate: boolean, deckCover: string) => {
        await dispatch(updatePack({id: packId, name: packName, isPrivate, deckCover}))
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
            {
                cardsCount > 0
                    ? <Tooltip title="learn">
                        <IconButton onClick={()=>navigate(PATH.LEARN + packId)}><SchoolIcon/></IconButton>
                    </Tooltip>
                    : <IconButton disabled><SchoolIcon/></IconButton>
            }


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
                       packName={packName}
                       deckCover={deckCover}
                       open={openEdit}
                       closeModal={closeEditModal}
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
