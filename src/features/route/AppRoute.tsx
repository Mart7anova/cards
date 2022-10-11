import {Navigate, Route, Routes} from 'react-router-dom';
import {PATH} from '../../common/enums/path';
import {ProtectedRoutes} from './ProtectedRoutes';
import {PageNotFound} from '../../common/components/PageNotFound/PageNotFound';
import {SignUp} from '../auth/signUp/SignUp';
import {SignIn} from '../auth/signIn/SignIn';

export const AppRoute = () => {

    return (
        <Routes>
            <Route path={PATH.SIGN_IN} element={<SignIn/>}/>
            <Route path={PATH.SIGN_UP} element={<SignUp/>}/>
            {/*<Route path={PATH.FORGOT_PASSWORD} element={<ForgotPassword/>}/>*/}
            {/*<Route path={PATH.NEW_PASSWORD} element={<NewPassword/>}/>*/}
            {/*<Route path={PATH.CHECK_EMAIL} element={<CheckEmail/>}/>*/}
            <Route path={PATH.PAGE_NOT_FOUND} element={<PageNotFound/>}/>
            <Route path={PATH.OTHER_ROUTS} element={<Navigate to={PATH.PAGE_NOT_FOUND}/>}/>
            <Route element={<ProtectedRoutes />}>
                <Route path={PATH.PACKS} element={<div>Packs</div>}/>
                <Route path={PATH.PROFILE} element={<div>Profile</div>}/>
                {/*<Route path={PATH.CARD} element={<CardsPage/>}/>*/}
                {/*<Route path={PATH.LEARN_CARD} element={<LearnPage/>}/>*/}
            </Route>
        </Routes>
    );
};
// <Route path={PATH.PACKS_LIST} element={<Main/>}>
//     <Route path={PATH.OTHER_ROUTS} element={<Navigate to={PATH.PAGE_NOT_FOUND}/>}/>
//     <Route path={PATH.PAGE_NOT_FOUND} element={<PageNotFound/>}/>
//
//     <Route path={PATH.LOGIN} element={<SignIn/>}/>
//     <Route path={PATH.REGISTRATION} element={<Registration/>}/>
//     <Route path={PATH.FORGOT_PASSWORD} element={<ForgotPassword/>}/>
//     <Route path={PATH.NEW_PASSWORD} element={<NewPassword/>}/>
//     <Route path={PATH.CHECK_EMAIL} element={<CheckEmail/>}/>
//
//     <Route index element={<PacksPage/>}/>
//     <Route path={PATH.PROFILE} element={<Profile/>}/>
//     <Route path={PATH.CARD} element={<CardsPage/>}/>
//     <Route path={PATH.LEARN_CARD} element={<LearnPage/>}/>
// </Route>