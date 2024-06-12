import { Axios, AxiosError } from "axios";

export type Reset = ()=> void
export type HandleSubmitFunction = (e: React.FormEvent<HTMLFormElement>, imageURL: string) => void;

export interface ColorsType {
    rgbColor: string;
    hslColor: string;
    hexColor: string;
}

export interface GetFrequentColorInitialState {
    value: ColorResponse | null,
    status: string,
    error: string | undefined
}

export interface ColorRequest {
    data: {
        hsl?: [number, number, number],
        rgb?: [number, number, number],
        hex?: string;
    }
}

export interface ColorResponse {
    status: number;
    data: {
        hsl?: [number, number, number]
        rgb?: [number, number, number]
        hex?: string;
        message?: string;
    }
}