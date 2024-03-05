import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {GetFrequentColorInitialState, ColorRequest} from "..'/../../interface"
import axios, { AxiosResponse } from "axios";

const initialState: GetFrequentColorInitialState = {
    value: null,
    status: "idle",
    error: undefined
}

export const getFrequentColorRequest = createAsyncThunk("frequentColor/frequentColorDataStatus", async(image_url: string)=>{
    try {

        const frequentColorResponse: AxiosResponse<ColorRequest> = await axios.get<ColorRequest>(`https://api.jankmg.com/get_most_common_color?image_url=${image_url}`, {
        })
        
        return frequentColorResponse.data
    } catch(error){
        return error;
    }
})

export const getFrequentColor = createSlice({
    name: "frequentColor",
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder.addCase(getFrequentColorRequest.pending, (state)=>{
            state.status = "loading";
        }).addCase(getFrequentColorRequest.fulfilled, (state, action)=>{
            state.status = "succeded";
            state.value = action.payload as ColorRequest;
        }).addCase(getFrequentColorRequest.rejected, (state, action)=>{
            state.status = "failed";
            state.error = action.error.message
        })
    }
})

export default getFrequentColor.reducer;