import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {GetFrequentColorInitialState, ColorRequest, ColorResponse} from "..'/../../interface"
import axios, { AxiosResponse } from "axios";

const initialState: GetFrequentColorInitialState = {
    value: null,
    status: "idle",
    error: undefined
}

export const getFrequentColorFileRequest = createAsyncThunk("frequentColor/frequentColorDataStatus", async(image_file: FileList)=>{
    try {
        // const frequentColorResponse: AxiosResponse<ColorRequest> = await axios.get<ColorRequest>(`https://api.jankmg.com/get_dominant_color_from_file?image_url=${image_url}`, {
        // })

        const formData = new FormData()
        formData.append("image", image_file[0])

        const frequentColorResponse: AxiosResponse<ColorRequest> = await axios.post<ColorRequest>(`http://localhost:8080/get_dominant_color_from_file`, formData, {
            headers: {
                "Content-Type": `multipart/form-data;`
            }
        })
        
        // const frequentColorResponse: AxiosResponse<ColorRequest> = await axios.get<ColorRequest>(`https://jankmgdev.pythonanywhere.com/get_dominant_color_from_file?image_url=${image_url}`, {
        // })

        const frequentColorRes: ColorResponse = {
            status: frequentColorResponse.status,
            data: frequentColorResponse.data.data
        }
        
        return frequentColorRes
    } catch(error: unknown){
        if(axios.isAxiosError(error)){
            let responseError: ColorResponse = {
                status: 500,
                data: {message: "Something went wrong"}
                
            }

            if(error.code === "ERR_NETWORK"){
                return responseError;
            }

            responseError.status = error.response?.status as number
            responseError.data = error.response?.data

            console.log(responseError)
            return responseError;
        }
    }
})

export const getFrequentColor = createSlice({
    name: "frequentColor",
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder.addCase(getFrequentColorFileRequest.pending, (state)=>{
            state.status = "loading";
        }).addCase(getFrequentColorFileRequest.fulfilled, (state, action)=>{
            state.status = "succeded";
            state.value = action.payload as ColorResponse;
        }).addCase(getFrequentColorFileRequest.rejected, (state, action)=>{
            state.status = "failed";
            state.error = action.error.message
        })
    }
})

export default getFrequentColor.reducer;