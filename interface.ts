import { AxiosError } from "axios";

export interface GetFrequentColorInitialState {
    value: ColorRequest | null,
    status: string,
    error: string | undefined
}

export interface ColorRequest {
    data: {
        rgb: [number, number, number]
    }
}