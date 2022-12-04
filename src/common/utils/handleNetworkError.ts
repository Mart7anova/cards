import {Dispatch} from 'redux';
import axios, {AxiosError} from 'axios';
import {setAppError} from "../../features/app/appSlice";


export const handleNetworkError =  (e: any, dispatch: Dispatch) => {
    const error = e as Error | AxiosError<{ error: string }>
    if(axios.isAxiosError(error)){
        const newError = error.response?.data ? error.response.data.error : error.message
        dispatch(setAppError(newError))
    }else {
        dispatch(setAppError( error.message ? error.message : 'Some error occurred'))
    }
}