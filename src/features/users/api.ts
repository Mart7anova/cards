import { AxiosResponse } from 'axios';

import { instance } from 'api/instance';
import { UsersResponseType, UsersSearchParamsType } from 'features/users/Types';

export const userApi = {
  getUsers(params?: UsersSearchParamsType) {
    return instance.get<UsersSearchParamsType, AxiosResponse<UsersResponseType>>(
      `/social/users`,
      { params },
    );
  },
};
