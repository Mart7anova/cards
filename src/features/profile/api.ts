import {ProfileResponseType} from '../../common/types/ProfileType';
import {instance} from '../../api/instance';


export const profileApi = {
    me() {
        return instance.post<ProfileResponseType>('/auth/me')
    },
    updateUser(name?: string, avatar?: string) {
        return instance.put<ResponseUpdateUser>('auth/me', {
            name,
            avatar
        })
    },
    blockUser(id: string, blockReason: string) {
        return instance.post('/auth/block', {id, blockReason})
    }
}


type ResponseUpdateUser = {
    updatedUser: ProfileResponseType,
    token: string,
    tokenDeathTime: number
}
