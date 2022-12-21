import { instance } from 'api/instance';
import { PathApi } from 'common/enums/PathApi';
import {
  forgotPasswordDataType,
  ResponseForgotPassword,
  ResponseLogout,
  ResponseSignUp,
} from 'features/auth/Types';
import { ProfileResponseType } from 'features/profile/Types';

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
  forgotPass(data: forgotPasswordDataType) {
    return instance.post<ResponseForgotPassword>(PathApi.FORGOT_PASSWORD, data);
  },
  setNewPass(password: string, resetPasswordToken: string) {
    return instance.post<{ info: string }>(PathApi.NEW_PASSWORD, {
      password,
      resetPasswordToken,
    });
  },
};
