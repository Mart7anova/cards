import { instance } from 'api';
import {
  ForgotPasswordDataType,
  ResponseForgotPassword,
  ResponseLogout,
  ResponseSignUp,
} from 'api/auth/types';
import { ProfileResponseType } from 'api/profile';
import { PathApi } from 'enums/PathApi';

export const authApi = {
  signUp(email: string, password: string) {
    return instance.post<ResponseSignUp>(PathApi.SIGN_UP, { email, password });
  },
  signIn(email: string, password: string, rememberMe: boolean) {
    return instance.post<ProfileResponseType>(PathApi.SIGN_IN, {
      email,
      password,
      rememberMe,
    });
  },
  signOut() {
    return instance.delete<ResponseLogout>(PathApi.SIGN_OUT);
  },
  forgotPass(data: ForgotPasswordDataType) {
    return instance.post<ResponseForgotPassword>(PathApi.FORGOT_PASSWORD, data);
  },
  setNewPass(password: string, resetPasswordToken: string) {
    return instance.post<{ info: string }>(PathApi.NEW_PASSWORD, {
      password,
      resetPasswordToken,
    });
  },
};
