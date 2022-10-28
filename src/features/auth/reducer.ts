import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {profileActions} from '../profile';
import {authApi} from './authApi';
import {handleNetworkError} from '../../common/utils/handleNetworkError';
import {StatusType} from '../../common/types/statusType';
import {appActions} from '../app';

const {setProfile} = profileActions

const signUp = createAsyncThunk('auth/SignUp',
    async (param: { email: string, password: string }, {dispatch, rejectWithValue}) => {
        dispatch(setAuthStatus('loading'))
        try {
            const res = await authApi.signUp(param.email, param.password)
            dispatch(appActions.setAppSuccess(res.statusText))
        } catch (e) {
            handleNetworkError(e, dispatch)
            return rejectWithValue(null)
        } finally {
            dispatch(setAuthStatus('idle'))
        }
    })

const signIn = createAsyncThunk('auth/SignIn',
    async (param: { email: string, password: string, rememberMe: boolean }, {dispatch, rejectWithValue}) => {
        dispatch(setAuthStatus('loading'))
        try {
            const {data} = await authApi.signIn(param.email, param.password, param.rememberMe)
            dispatch(setProfile(data))
        } catch (e) {
            dispatch(appActions.setAppError('incorrect email or password'))
            return rejectWithValue(null)
        } finally {
            dispatch(setAuthStatus('idle'))
        }
    })

const signOut = createAsyncThunk('auth/signOut',
    async (param, {dispatch, rejectWithValue}) => {
        dispatch(setAuthStatus('loading'))
        try {
            const res = await authApi.signOut()
            dispatch(appActions.setAppSuccess(res.data.info))
        } catch (e) {
            handleNetworkError(e, dispatch)
            return rejectWithValue(null)
        } finally {
            dispatch(setAuthStatus('idle'))
        }
    })

const forgotPassword = createAsyncThunk('auth/forgotPass',
    async (param: { email: string }, {dispatch, rejectWithValue}) => {
        dispatch(setAuthStatus('loading'))
        try {
            const email = param.email
            await authApi.forgotPass({
                email,
                from: 'test-front-admin <1@gmail.com>',
                message: `<div>Перейдите по ссылке, чтобы продолжить востановление пароля <a href='http://localhost:3000/#/set-new-password/$token$'>link</a></div>`
            })
            return email
        } catch (e) {
            handleNetworkError(e, dispatch)
            return rejectWithValue(null)
        } finally {
            dispatch(setAuthStatus('idle'))
        }
    })

const updatePassword = createAsyncThunk('auth/updatePass',
    async (param: { password: string, token: string }, {dispatch, rejectWithValue}) => {
        dispatch(setAuthStatus('loading'))
        try {
            const res = await authApi.setNewPass(param.password, param.token)
            dispatch(appActions.setAppSuccess(res.data.info))
        } catch (e) {
            handleNetworkError(e, dispatch)
            return rejectWithValue(null)
        } finally {
            dispatch(setAuthStatus('idle'))
        }
    })

export const asyncActions = {
    signUp,
    signIn,
    signOut,
    forgotPassword,
    updatePassword,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
        isSignedUp: false,
        passwordIsChanging: false,
        email: '',
        status: 'idle' as StatusType,
    },
    reducers: {
        setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
            state.isLoggedIn = action.payload
        },
        setAuthStatus: (state, action: PayloadAction<StatusType>) => {
            state.status = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signUp.fulfilled, (state) => {
                state.isSignedUp = true

            })
            .addCase(signIn.fulfilled, (state) => {
                state.isLoggedIn = true
                state.isSignedUp = true
            })
            .addCase(signOut.fulfilled, (state) => {
                state.isLoggedIn = false
            })
            .addCase(forgotPassword.fulfilled, (state, action) => {
                state.passwordIsChanging = true
                state.email = action.payload
            })
            .addCase(updatePassword.fulfilled, (state) => {
                state.passwordIsChanging = false
                state.isSignedUp = true
                state.email = ''
            })
    }
})

const {setAuthStatus} = authSlice.actions