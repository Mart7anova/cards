import {Dispatch} from 'redux';
import {appActions} from '../../features/application';
import axios, {AxiosError} from 'axios';


export const handleNetworkError =  (e: any, dispatch: Dispatch) => {
    const error = e as Error | AxiosError<{ error: string }>
    if(axios.isAxiosError(error)){
        const newError = error.response?.data ? error.response.data.error : error.message
        dispatch(appActions.setAppError(newError))
    }else {
        dispatch(appActions.setAppError( error.message ? error.message : 'Some error occurred'))
    }
}