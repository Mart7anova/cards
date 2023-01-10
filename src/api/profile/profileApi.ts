import { instance } from 'api';
import { ProfileResponseType, ResponseUpdateUser } from 'api/profile/types';
import { PathApi } from 'enums';

export const profileApi = {
  me() {
    return instance.post<ProfileResponseType>(PathApi.ME);
  },
  updateUser(name?: string, avatar?: string) {
    return instance.put<ResponseUpdateUser>(PathApi.ME, {
      name,
      avatar,
    });
  },
  blockUser(id: string, blockReason: string) {
    return instance.post(PathApi.BLOCK_USER, { id, blockReason });
  },
};
