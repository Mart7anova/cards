import { ReactElement } from 'react';

import { Navigate, Route, Routes } from 'react-router-dom';

import { ProtectedRoutes } from 'appRoute/ProtectedRoutes';
import { Learn } from 'components/learn/Learn';
import { Path } from 'enums';
import { CheckEmail } from 'pages/auth/checkEmail';
import { CreateNewPassword } from 'pages/auth/createNewPassword';
import { ForgotPassword } from 'pages/auth/forgotPassword';
import { SignIn } from 'pages/auth/signIn';
import { SignUp } from 'pages/auth/signUp';
import { CardsPage } from 'pages/cards';
import { ChatPage } from 'pages/chat';
import { MyProfilePage } from 'pages/myProfile';
import { PacksPage } from 'pages/packs';
import { PageNotFound } from 'pages/pageNotFound';
import { UserProfilePage } from 'pages/userProfile';
import { UsersPage } from 'pages/users';

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
        <Route path={Path.PACKS} element={<PacksPage />} />
        <Route path={Path.PROFILE} element={<MyProfilePage />} />
        <Route path={Path.CARD} element={<CardsPage />} />
        <Route path={Path.LEARN_CARD} element={<Learn />} />
        <Route path={Path.USERS} element={<UsersPage />} />
        <Route path={Path.USER} element={<UserProfilePage />} />
        <Route path={Path.CHAT} element={<ChatPage />} />
      </Route>
    </Routes>
  );
};
