import { AxiosResponse } from 'axios';

import { instance } from 'api';
import {
  UserResponseType,
  UsersResponseType,
  UsersSearchParamsType,
} from 'api/users/types';
import { PathApi } from 'enums';

export const userApi = {
  getUsers(params?: UsersSearchParamsType) {
    return instance.get<UsersSearchParamsType, AxiosResponse<UsersResponseType>>(
      PathApi.USERS,
      { params },
    );
  },
  getUser(userId: string) {
    return instance.get<UserResponseType>(`${PathApi.USER}?id=${userId}`);
  },
};
