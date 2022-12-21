import { AxiosResponse } from 'axios';

import { instance } from 'api/instance';
import { PathApi } from 'common/enums/PathApi';
import {
  UserResponseType,
  UsersResponseType,
  UsersSearchParamsType,
} from 'features/users/Types';

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
