import { configureStore } from "@reduxjs/toolkit";
import getFrequentColor from "./features/get_frequent_color/get_frequent_color"
import getFrequentColorFromFile from "./features/get_frequent_color/get_frequent_color_file"

export const store = configureStore({
    reducer: {
        getFrequentColor: getFrequentColor,
        getFrequentColorFromFiel: getFrequentColorFromFile
    }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>