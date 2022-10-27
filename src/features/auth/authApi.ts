import {instance, instanceForHeroku} from '../../api/instance';
import {ProfileResponseType} from '../../common/types/profileType';


export const authApi = {
    signUp(email: string, password: string) {
        return instance.post<ResponseSignUp>('auth/register', {email, password})
    },
    signIn(email: string, password: string, rememberMe: boolean) {
        return instance.post<ProfileResponseType>('/auth/login', {
            email,
            password,
            rememberMe
        })
    },
    signOut() {
        return instance.delete<ResponseLogout>('auth/me')
    },
    forgotPass(data: forgotPasswordDataType) {
        return instanceForHeroku.post<ResponseForgotPassword>('auth/forgot', data)
    },
    setNewPass(password: string, resetPasswordToken: string) {
        return instanceForHeroku.post<{ info: string }>('auth/set-new-password', {
            password,
            resetPasswordToken
        })
    }
}


type forgotPasswordDataType = {
    email: string
    from: string
    message: string
}

type ResponseSignUp = {
    error: string
    email: string
    in: string
}

type ResponseLogout = {
    info: string
}

export type ResponseForgotPassword = {
    info: string
    success: boolean
    answer: boolean
    html: boolean
}


