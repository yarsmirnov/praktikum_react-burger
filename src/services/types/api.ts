export type TUserRegisterForm = {
  email: string;
  password: string;
  name: string;
}

export type TUserLoginForm = {
  email: string;
  password: string;
}

export type TUserPatchForm = {
  password?: string,
  name?: string,
  email?: string,
}

export type TUserForgotPasswordForm = {
  email: string;
}

export type TUserResetPasswordForm = {
  password: string;
  token: string;
}

export type TOrderSendData = {
  ingredients: Array<string>;
}
