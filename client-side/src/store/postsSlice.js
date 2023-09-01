import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; 
import axios from "axios";


export const getAllPosts = createAsyncThunk('posts/getAllPosts', async () => {
    const backEndLink = process.env.REACT_APP_BACKEND_URL
    try {
        const response = await axios.get(`${backEndLink}/posts`, { withCredentials: true })
        return response.data
    } catch (error) {
        console.error('error happened', error)
    }
})

const initialState = {
    posts: [],
    isLoading: true
}

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getAllPosts.fulfilled, (state, action) => {
            state.posts = action.payload
            state.isLoading = false
        })
    }
})

export default postsSlice.reducer