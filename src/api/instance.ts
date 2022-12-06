import axios from "axios"

export const instance = axios.create({
    baseURL: process.env.BASE_URL || `https://neko-back.herokuapp.com/2.0`,
    withCredentials: true,
})
