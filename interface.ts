import { Axios, AxiosError } from "axios";

export type Reset = ()=> void
export type HandleSubmitFunction = (e: React.FormEvent<HTMLFormElement>, imageURL: string) => void;

export interface GetFrequentColorInitialState {
    value: ColorResponse | null,
    status: string,
    error: string | undefined
}

export interface ColorRequest {
    data: {
        rgb?: [number, number, number],
    }
}

export interface ColorResponse {
    status: number;
    data: {
        rgb?: [number, number, number]
        messagea?: string;
    }
}