import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ProfileResponseType} from '../../common/types/profileType';
import {profileApi} from '../../api/profileApi';
import {StatusType} from '../../common/types/statusType';
import {handleNetworkError} from '../../common/utils/handleNetworkError';

const getProfile = createAsyncThunk('profile/setProfile',
    async (param, {rejectWithValue, dispatch}) => {
    try {
        const {data} = await profileApi.me()
        return data
    } catch (e) {
        handleNetworkError(e, dispatch)
        return rejectWithValue(null)
    }
})

const updateProfile = createAsyncThunk('profile/updateProfile',
    async (param: { name?: string, avatar?: string }, thunkAPI) => {
    try {
        const {data} = await profileApi.updateUser(param.name, param.avatar)
        return data.updatedUser
    } catch (e) {
        return thunkAPI.rejectWithValue(e)
    }
})

export const asyncActions = {
    getProfile,
    updateProfile
}

export const slice = createSlice({
    name: 'app',
    initialState: {
        profile: {} as ProfileResponseType,
        status: 'idle' as StatusType,
    },
    reducers: {
        setProfile (state, action: PayloadAction<ProfileResponseType>){
            state.profile = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProfile.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getProfile.fulfilled, (state, actions) => {
                state.profile = actions.payload
                state.status = 'idle'
            })
            .addCase(getProfile.rejected, (state) => {
                state.status = 'idle'
            })

            .addCase(updateProfile.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.profile = action.payload
                state.status = 'idle'
            })
            .addCase(updateProfile.rejected, (state) => {
                state.status = 'idle'
            })
    }
})

