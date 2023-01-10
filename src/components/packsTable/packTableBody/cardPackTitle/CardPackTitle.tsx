import React, { ReactElement } from 'react';

import { Link } from 'react-router-dom';

import { Path } from 'enums';
import { addAlternateSrc } from 'utils';

type PropsType = {
  packId: string;
  deckCover: string;
  name: string;
};

export const CardPackTitle = ({ packId, deckCover, name }: PropsType): ReactElement => {
  return (
    <Link
      to={Path.PACK + packId}
      style={{
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      {deckCover && (
        <img
          src={deckCover}
          onError={addAlternateSrc}
          alt={' '}
          style={{ height: '50px', paddingRight: '15px' }}
        />
      )}
      <p style={{ color: '#196cbe' }}>{name}</p>
    </Link>
  );
};
