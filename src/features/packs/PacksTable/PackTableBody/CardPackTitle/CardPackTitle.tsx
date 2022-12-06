import React from 'react';
import {PATH} from "../../../../../common/enums/path";
import {addAlternateSrc} from "../../../../../common/utils/addAlternateSrc";
import {Link} from "react-router-dom";

type PropsType = {
    packId: string
    deckCover: string
    name: string
}

export const CardPackTitle = ({packId, deckCover, name}: PropsType) => {
    return (
        <Link to={PATH.PACK + packId} style={{
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap'
        }}>
            {
                deckCover && <img src={deckCover}
                                  onError={addAlternateSrc}
                                  alt={' '}
                                  style={{height: '50px', paddingRight: '15px'}}/>
            }
            <p style={{color: '#196cbe'}}>{name}</p>
        </Link>
    );
};
