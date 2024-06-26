"use client";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./comment";
import { PiHandsClappingLight } from "react-icons/pi";
import { instance } from "@/libs/axios";
import { useRouter } from "next/navigation";

export const UserCommentLike = ({ comment_id, owner_id } : { comment_id : string, owner_id : string }) => {
    const { user_id, blog_id } = useContext(UserContext);
    const [isLike, setIsLike] = useState(false);
    const [totalLikes, setTotalLikes] = useState(0);
    const router = useRouter();
    useEffect(() => {
        const getLikes = async () => {
            try {
                const isLikedByUser = (await instance.get("/api/isLike", { params: {comment_id, liker_id : user_id }})).data.result;
                const { totalLikes } = (await instance.get("/api/commentTotalLikes", { params: { comment_id }})).data;
                setTotalLikes(totalLikes)
                setIsLike(isLikedByUser);

            } catch(error : any) {
                router.push("/Error")
            }
        }

        getLikes();
    }, [comment_id, router, user_id]);

    const handleClick = async () => {
        try {
            await instance.post("/api/blog/like", { comment_id, like: isLike, owner_id, blog_id });
            setIsLike(prev => !prev);
            setTotalLikes(prev => isLike ? prev - 1 : prev + 1);
        } catch(error : any) {
            if (error?.response?.status === 401 || error?.response?.status === 403) return alert(error.response.data.message);
            console.log(error.message)
        }
    }

    return(
        <>
            <PiHandsClappingLight className="cursor-pointer inline mr-2" onClick={handleClick} size={"1.2rem"} color={isLike ? "red" : ""} />
            <span>{totalLikes}</span>
        </>
    )
}