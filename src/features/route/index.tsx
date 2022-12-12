import { ReactElement } from 'react';

import { Navigate, Route, Routes } from 'react-router-dom';

import { CheckEmail } from '../auth/CheckEmail/CheckEmail';
import { CreateNewPassword } from '../auth/CreateNewPassword/CreateNewPassword';
import { ForgotPassword } from '../auth/ForgotPassword/ForgotPassword';
import { SignIn } from '../auth/SignIn/SignIn';
import { SignUp } from '../auth/SignUp/SignUp';
import { Cards } from '../cards';
import { Learn } from '../cards/Learn/Learn';
import { Packs } from '../packs';
import { Profile } from '../profile';

import { ProtectedRoutes } from './ProtectedRoutes';

import { PageNotFound } from 'common/components/PageNotFound/PageNotFound';
import { Path } from 'common/enums/Path';
import { Users } from 'features/users';

export const AppRoute = (): ReactElement => {
  return (
    <Routes>
      <Route path={Path.SIGN_IN} element={<SignIn />} />
      <Route path={Path.SIGN_UP} element={<SignUp />} />
      <Route path={Path.FORGOT_PASSWORD} element={<ForgotPassword />} />
      <Route path={Path.NEW_PASSWORD} element={<CreateNewPassword />} />
      <Route path={Path.CHECK_EMAIL} element={<CheckEmail />} />
      <Route path={Path.PAGE_NOT_FOUND} element={<PageNotFound />} />
      <Route path={Path.OTHER_ROUTS} element={<Navigate to={Path.PAGE_NOT_FOUND} />} />

      <Route element={<ProtectedRoutes />}>
        <Route path={Path.PACKS} element={<Packs />} />
        <Route path={Path.PROFILE} element={<Profile />} />
        <Route path={Path.CARD} element={<Cards />} />
        <Route path={Path.LEARN_CARD} element={<Learn />} />
        <Route path={Path.USERS} element={<Users />} />
        {/* <Route path={Path.USER} element={<User />} /> */}
      </Route>
    </Routes>
  );
};
