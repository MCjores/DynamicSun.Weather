import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

const init = {
    status: {
        isLoading: false,
        isError: false,
        isSuccess: false,
    },
    msg: {
        error: '',
        success: ""
    }
}

export const sendDataAsync = createAsyncThunk<any, any, any>("sendData",
    async (selectedFiles, thunkAPI) =>
        await axios.post(
            'https://localhost:5001/WeatherArchive/upload',
            selectedFiles
        )
            .then(res => Promise.resolve(res.data))
            .catch(err => {
                if (err.response)
                    thunkAPI.dispatch(setMsgError(err.response.data)); // => the response payload 
                return Promise.reject()
            }))


export const uploadSlice = createSlice({
    initialState: init,
    name: "uploadSlice",
    reducers: {
        setMsgError(state, action) {
            state.msg.error = action.payload
        }
    },
    extraReducers(builder) {
        const setIsSuccess = (state: any) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
        }
        const setIsLoading = (state: any) => {
            state.isLoading = true
            state.isError = false
            state.isSuccess = false
        }
        const setIsError = (state: any) => {
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
        }

        builder
            .addCase(sendDataAsync.pending, state => {
                setIsLoading(state.status)
            })
            .addCase(sendDataAsync.fulfilled, (state, action) => {
                setIsSuccess(state.status)
                state.msg.success = action.payload
            })
            .addCase(sendDataAsync.rejected, (state, action) => {
                setIsError(state.status)
            })
    },

})

export const { setMsgError } = uploadSlice.actions