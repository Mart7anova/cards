import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {profileActions} from '../profile';
import {authApi} from '../../api/authApi';
import {handleNetworkError} from '../../common/utils/handleNetworkError';
import {StatusType} from '../../common/types/statusType';

const {setProfile} = profileActions

const signUp = createAsyncThunk('auth/signUp',
    async (param: { email: string, password: string }, {dispatch, rejectWithValue}) => {
        try {
            await authApi.signUp(param.email, param.password)
        } catch (e) {
            handleNetworkError(e, dispatch)
            return rejectWithValue(null)
        }
    })

const signIn = createAsyncThunk('auth/signIn',
    async (param: { email: string, password: string, rememberMe: boolean },  {dispatch, rejectWithValue}) => {
        try {
            const {data} = await authApi.signIn(param.email, param.password, param.rememberMe)
            dispatch(setProfile(data))
        } catch (e) {
            handleNetworkError(e, dispatch)
            return rejectWithValue(null)
        }
    })

const signOut = createAsyncThunk('auth/signOut',
    async (param, thunkAPI) => {
        try {
            await authApi.signOut()
        } catch (e) {
            handleNetworkError(e, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue(null)
        }
    })

const forgotPassword = createAsyncThunk('auth/forgotPass',
    async (param: {email: string}, thunkAPI) => {
        try {
            const email = param.email
            await authApi.forgotPass({
                email,
                from: 'test-front-admin <1@gmail.com>',
                message: `<div>Перейдите по ссылке, чтобы продолжить востановление пароля <a href='http://localhost:3000/#/set-new-password/$token$'>link</a></div>`
            })
            return email
        } catch (e) {
            handleNetworkError(e, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue(null)
        }
    })

const updatePassword = createAsyncThunk('auth/updatePass',
    async (param: {password: string, token: string}, thunkAPI) => {
        try {
            await authApi.setNewPass(param.password, param.token)
        } catch (e) {
            handleNetworkError(e, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue(null)
        }
    })

export const asyncActions = {
    signUp,
    signIn,
    signOut,
    forgotPassword,
    updatePassword,
}

export const slice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
        isSignedUp: false,
        passwordIsChanging: false,
        email: '',
        status: 'idle' as StatusType,
    },
    reducers: {
        setIsLoggedIn: (state, action: PayloadAction<boolean>)=>{
            state.isLoggedIn = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(signUp.pending,  (state) => {
                state.status = 'loading'
            })
            .addCase(signUp.fulfilled, (state) => {
                state.isSignedUp = true
                state.status = 'idle'
            })
            .addCase(signUp.rejected, (state) => {
                state.status = 'idle'
            })

            .addCase(signIn.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(signIn.fulfilled, (state) => {
                state.isLoggedIn = true
                state.isSignedUp = true
                state.status = 'idle'
            })
            .addCase(signIn.rejected, (state) => {
                state.status = 'idle'
            })

            .addCase(signOut.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(signOut.fulfilled, (state) => {
                state.isLoggedIn = false
                state.status = 'idle'
            })
            .addCase(signOut.rejected, (state) => {
                state.status = 'idle'
            })

            .addCase(forgotPassword.pending, (state)=>{
                state.status = 'loading'
            })
            .addCase(forgotPassword.fulfilled, (state, action)=>{
                state.passwordIsChanging = true
                state.email = action.payload
                state.status = 'idle'
            })
            .addCase(forgotPassword.rejected, (state) => {
                state.status = 'idle'
            })

            .addCase(updatePassword.pending, (state)=>{
                state.status = 'loading'
            })
            .addCase(updatePassword.fulfilled, (state)=>{
                state.passwordIsChanging = false
                state.isSignedUp = true
                state.email = ''
                state.status = 'idle'
            })
            .addCase(updatePassword.rejected, (state) => {
                state.status = 'idle'
            })
    }
})