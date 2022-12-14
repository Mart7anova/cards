import React, { ReactElement } from 'react';

import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SchoolIcon from '@mui/icons-material/School';
import { IconButton, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { DeleteModal } from 'components/common';
import { PackModal } from 'components/packModal';
import { Path } from 'enums';
import { useAppDispatch, useAppSelector, useModal } from 'hooks';
import { selectProfile } from 'store/selectors';
import { deletePack, fetchPacks, updatePack } from 'store/thunks';

type PropsType = {
  packUserId: string;
  packId: string;
  packName: string;
  cardsCount: number;
  deckCover: string;
};

export const PackIconsGroup = ({
  packUserId,
  packId,
  packName,
  cardsCount,
  deckCover,
}: PropsType): ReactElement => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { _id } = useAppSelector(selectProfile);

  const { open, openModal, closeModal } = useModal();
  const { openEdit, openEditModal, closeEditModal } = useModal();

  const isOwner = packUserId === _id;

  const packUpdateHandle = async (
    packName: string,
    isPrivate: boolean,
    deckCover: string,
  ): Promise<void> => {
    await dispatch(updatePack({ id: packId, name: packName, isPrivate, deckCover }));
    await dispatch(fetchPacks());
    closeEditModal();
  };

  const packDeleteHandle = async (): Promise<void> => {
    await dispatch(deletePack({ id: packId }));
    await dispatch(fetchPacks());
    closeModal();
  };

  return (
    <>
      {cardsCount > 0 ? (
        <Tooltip title="learn">
          <IconButton onClick={() => navigate(Path.LEARN + packId)}>
            <SchoolIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <IconButton disabled>
          <SchoolIcon />
        </IconButton>
      )}

      {isOwner ? (
        <>
          <Tooltip title="edit">
            <IconButton onClick={openEditModal}>
              <BorderColorIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="delete">
            <IconButton onClick={openModal}>
              <DeleteForeverIcon />
            </IconButton>
          </Tooltip>
        </>
      ) : (
        <>
          <IconButton disabled>
            <BorderColorIcon color="disabled" />
          </IconButton>

          <IconButton disabled>
            <DeleteForeverIcon color="disabled" />
          </IconButton>
        </>
      )}

      <PackModal
        title="Edit pack"
        packName={packName}
        deckCover={deckCover}
        open={openEdit}
        closeModal={closeEditModal}
        sentChanges={packUpdateHandle}
      />

      <DeleteModal
        title="Delete pack"
        isPack
        deleteItem={packDeleteHandle}
        itemName={packName}
        open={open}
        closeModal={closeModal}
      />
    </>
  );
};
