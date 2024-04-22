"use client"
import { PiHandsClappingThin } from "react-icons/pi";
import { LiaCommentsSolid } from "react-icons/lia";
import { useState } from "react";
import { instance } from "@/libs/axios";

export const LikeComponent = ({ totalLikes, owner_id, blog_id, isLike  } : { totalLikes : number, owner_id : string, blog_id: string, isLike : boolean }) => {
    const [likes, setLikes] = useState<number>(totalLikes);
    const [like, setLike] = useState(isLike || false);
    const handleClick = async () => {
        try {
            await instance.post("/api/likeBlog", { owner_id, blog_id, like });
            setLikes(prev => like? prev - 1 : prev + 1);
            setLike(prev => !prev);
        } catch(error : any) {
            if (error?.response?.status === 401 || error?.response?.status === 403) return alert("Please login first")
        }
    }
    

    return(
        <>
            <div className="flex gap-5">
                <div>
                    <PiHandsClappingThin onClick={handleClick} color={like ? "red" : ""} size={"1.6rem"} className="cursor-pointer inline mr-1"  /> 
                    <span>{likes}</span>
                </div>
                <div>
                    <LiaCommentsSolid size={"1.6rem"} className="cursor-pointer inline mr-1"  /> 
                    <span>0</span>
                </div>
            </div>
        </>
    )
}