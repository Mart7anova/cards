import {Navigate, Route, Routes} from 'react-router-dom';
import {PATH} from '../../common/enums/path';
import {ProtectedRoutes} from './ProtectedRoutes';
import {PageNotFound} from '../../common/components/PageNotFound/PageNotFound';
import {SignUp} from '../auth/signUp/SignUp';
import {SignIn} from '../auth/signIn/SignIn';
import { ForgotPassword } from '../auth/forgotPassword/ForgotPassword';
import {CheckEmail} from '../auth/checkEmail/CheckEmail';
import {CreateNewPassword} from '../auth/createNewPassword/CreateNewPassword';
import {Profile} from '../profile/Profile';
import {Packs} from '../packs/Packs';
import {Cards} from '../cards/Cards';
import {Learn} from '../cards/Learn/Learn';

export const AppRoute = () => {

    return (
        <Routes>
            <Route path={PATH.SIGN_IN} element={<SignIn/>}/>
            <Route path={PATH.SIGN_UP} element={<SignUp/>}/>
            <Route path={PATH.FORGOT_PASSWORD} element={<ForgotPassword/>}/>
            <Route path={PATH.NEW_PASSWORD} element={<CreateNewPassword/>}/>
            <Route path={PATH.CHECK_EMAIL} element={<CheckEmail/>}/>
            <Route path={PATH.PAGE_NOT_FOUND} element={<PageNotFound/>}/>
            <Route path={PATH.OTHER_ROUTS} element={<Navigate to={PATH.PAGE_NOT_FOUND}/>}/>
            <Route element={<ProtectedRoutes />}>
                <Route path={PATH.PACKS} element={<Packs/>}/>
                <Route path={PATH.PROFILE} element={<Profile/>}/>
                <Route path={PATH.CARD} element={<Cards/>}/>
                <Route path={PATH.LEARN_CARD} element={<Learn/>}/>
            </Route>
        </Routes>
    );
};
