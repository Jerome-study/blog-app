"use client"
import useSWR from "swr";
import { instance } from "./axios";

const fetcher = (url : any) => instance.get(url).then(res => res.data);


export const useFetch = (url : any) => {
    const { data, error, isLoading } = useSWR(url, fetcher)
    
    return {
        data,
        error,
        isLoading
    }
}