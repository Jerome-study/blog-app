"use client"

import { useContext } from "react"
import { UserContext } from "./comment"
import { instance } from "@/libs/axios";



export const Dots = ({ commenter_id, comment_id } : { commenter_id : string, comment_id: string }) => {
    const { blog_id, user_id } = useContext(UserContext);

    const handleClick = async () => {
        if (user_id !== commenter_id) return 
        try {
            await instance.post("/api/blog/deleteComment", { blog_id, user_id, comment_id })
        } catch(error: any) {
            console.log(error.response)
        }
    }

    return(
        <div className="bg-slate-900 rounded-lg py-1 w-20 fixed w-20 -ml-20">
            <div className="text-white text-center cursor-pointer" onClick={handleClick}>Delete</div>
        </div>
    )
}