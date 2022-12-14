export type UserType = {
  avatar: string;
  created: string;
  email: string;
  isAdmin: boolean;
  name: string;
  publicCardPacksCount: number;
  updated: string;
  verified: boolean;
  _id: string;
};

export type UsersResponseType = {
  users: UserType[];
  maxPublicCardPacksCount: number;
  minPublicCardPacksCount: number;
  page: number;
  pageCount: number;
  usersTotalCount: number;
};

export type UserResponseType = {
  user: UserType;
  token: string;
  tokenDeathTime: number;
};

export type UsersSearchParamsType = {
  userName?: string;
  min?: number;
  max?: number;
  sortUsers?: string;
  page?: number;
  pageCount?: number;
};
