import { instance } from 'api/instance';
import {
  forgotPasswordDataType,
  ResponseForgotPassword,
  ResponseLogout,
  ResponseSignUp,
} from 'features/auth/Types';
import { ProfileResponseType } from 'features/profile/Types';

export const authApi = {
  signUp(email: string, password: string) {
    return instance.post<ResponseSignUp>('auth/register', { email, password });
  },
  signIn(email: string, password: string, rememberMe: boolean) {
    return instance.post<ProfileResponseType>('/auth/login', {
      email,
      password,
      rememberMe,
    });
  },
  signOut() {
    return instance.delete<ResponseLogout>('auth/me');
  },
  forgotPass(data: forgotPasswordDataType) {
    return instance.post<ResponseForgotPassword>('auth/forgot', data);
  },
  setNewPass(password: string, resetPasswordToken: string) {
    return instance.post<{ info: string }>('auth/set-new-password', {
      password,
      resetPasswordToken,
    });
  },
};
