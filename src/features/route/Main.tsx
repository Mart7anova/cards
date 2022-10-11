import React from 'react';
import {Link} from 'react-router-dom';
import {PATH} from '../../common/enums/path';

export const Main = () => {
    return (
        <div>
            <Link to={PATH.PACKS}>packs</Link>
            <Link to={PATH.SIGN_IN}>signIn</Link>
            <Link to={PATH.SIGN_UP}>signUp</Link>
            <Link to={PATH.PAGE_NOT_FOUND}>pnf</Link>
        </div>
    );
};
