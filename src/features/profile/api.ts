import { instance } from 'api/instance';
import { PathApi } from 'common/enums/PathApi';
import { ProfileResponseType, ResponseUpdateUser } from 'features/profile/Types';

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
