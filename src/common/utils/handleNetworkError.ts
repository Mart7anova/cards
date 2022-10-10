import {Dispatch} from 'redux';
import {appActions} from '../../features/application';
import {AxiosError} from 'axios';


export const handleNetworkError =  (e: any, dispatch: Dispatch) => {
    const error = e as Error | AxiosError<{ error: string }>
    dispatch(appActions.setAppError( error.message ? error.message : 'Some error occurred'))
}