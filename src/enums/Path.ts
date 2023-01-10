export enum Path {
  OTHER_ROUTS = '*',
  PAGE_NOT_FOUND = '/404',

  PACKS = '/',
  PACK = '/pack/',
  CARD = '/pack/:packId',
  LEARN = '/learn/',
  LEARN_CARD = '/learn/:packId/',

  SIGN_IN = '/sign-in',
  SIGN_UP = '/sign-up',
  FORGOT_PASSWORD = '/forgot-password',
  NEW_PASSWORD = '/set-new-password/:token',
  CHECK_EMAIL = '/check-email',

  PROFILE = '/profile',
  USERS = '/user/',
  USER = '/user/:userId',

  CHAT = '/chat',
}
