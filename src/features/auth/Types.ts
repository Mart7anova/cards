export type forgotPasswordDataType = {
  email: string;
  from: string;
  message: string;
};

export type ResponseSignUp = {
  error: string;
  email: string;
  in: string;
};

export type ResponseLogout = {
  info: string;
};

export type ResponseForgotPassword = {
  info: string;
  success: boolean;
  answer: boolean;
  html: boolean;
};
