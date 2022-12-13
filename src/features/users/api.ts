import { AxiosResponse } from 'axios';

import { instance } from 'api/instance';
import {
  UserResponseType,
  UsersResponseType,
  UsersSearchParamsType,
} from 'features/users/Types';

export const userApi = {
  getUsers(params?: UsersSearchParamsType) {
    return instance.get<UsersSearchParamsType, AxiosResponse<UsersResponseType>>(
      `/social/users`,
      { params },
    );
  },
  getUser(userId: string) {
    return instance.get<UserResponseType>(`/social/user?id=${userId}`);
  },
};
