export type ProfileResponseType<T = string, D = number> = {
    _id: string
    email: string
    rememberMe: boolean
    isAdmin: boolean
    name: string
    verified: boolean
    publicCardPacksCount: number
    created: string
    updated: string
    __v: number
    token: T
    tokenDeathTime: D
    avatar?: null | string
}