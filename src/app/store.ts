import { configureStore } from "@reduxjs/toolkit";
import getFrequentColor from "./features/get_frequent_color/get_frequent_color"

export const store = configureStore({
    reducer: {
        getFrequentColor: getFrequentColor,
    }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>