import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {GetFrequentColorInitialState, ColorRequest, ColorResponse} from "..'/../../interface"
import axios, { AxiosError, AxiosResponse } from "axios";

const initialState: GetFrequentColorInitialState = {
    value: null,
    status: "idle",
    error: undefined
}

export const getFrequentColorRequest = createAsyncThunk("frequentColor/frequentColorDataStatus", async(image_url: string)=>{
    try {
        const frequentColorResponse: AxiosResponse<ColorRequest> = await axios.get<ColorRequest>(`https://api.jankmg.com/get_most_common_color?image_url=${image_url}`, {
        })

        const frequentColorRes: ColorResponse = {
            status: frequentColorResponse.status,
            data: frequentColorResponse.data.data
        }
        
        return frequentColorRes
    } catch(error: unknown){
        if(axios.isAxiosError(error)){
            let responseError: ColorResponse = {
                status: 500,
                data: {messagea: "Something went wrong"}
                
            }

            if(error.code === "ERR_NETWORK"){
                return responseError;
            }

            responseError.status = error.response?.status as number
            responseError.data = error.response?.data

            return responseError;
        }
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
            state.value = action.payload as ColorResponse;
        }).addCase(getFrequentColorRequest.rejected, (state, action)=>{
            state.status = "failed";
            state.error = action.error.message
        })
    }
})

export default getFrequentColor.reducer;