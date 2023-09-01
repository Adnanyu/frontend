import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

export const initialState = {
    currentUser: null
}
  
export const checkAuthentication = createAsyncThunk('user/checkAuthentication', async () => {
    const backEndLink = process.env.REACT_APP_BACKEND_URL
    try {
        const response = await axios.get(`${backEndLink}/users`, { withCredentials: true })
        return response.data
    } catch (error) {
        console.log(error)
    }
})

export const logOutUser = createAsyncThunk('user/logOutUser', async () => {
    const backEndLink = process.env.REACT_APP_BACKEND_URL
    try {
        const response = await axios.get(`${backEndLink}/users/logout`, { withCredentials: true })
        return response.data
    } catch (error) {
        console.log(error)
    }
})

export const savePost = createAsyncThunk('user/savePost', async (id, thunkApi) => {
    const backEndLink = process.env.REACT_APP_BACKEND_URL
    try {
        const response = await axios.post(`${backEndLink}/users/favorites`, { id }, { withCredentials: true })
        return response.data
    }catch(error){
        console.error('error:', error)
    }
})

const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        Login: (state, action) => {
            state.currentUser = action.payload
        },
        useLogout: (state) => {
            state.currentUser = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(checkAuthentication.fulfilled, (state, action) => {
            state.currentUser = action.payload;
        });
        builder.addCase(logOutUser.fulfilled, (state) => {
            state.currentUser = null
        });
        builder.addCase(savePost.fulfilled, (state, action) => {
            state.currentUser = action.payload.user
        })
    }
})

export const { Login, useLogout } = UserSlice.actions
export default UserSlice.reducer