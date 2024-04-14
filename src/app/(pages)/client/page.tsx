"use client"

import { instance } from "@/libs/axios"
import { useEffect } from "react"


export default  function ClientPage ()  {

    useEffect(() => {
        const isAUth = async () => {
            const response = await instance.get("/api/cookie");
            console.log(response);
        }
        isAUth();
    }, [])


    return(
        <>
            <h1>Client Page</h1>
            <button>Get Cookie</button>
            <button>Set Cookie</button>
        </>
    )
}