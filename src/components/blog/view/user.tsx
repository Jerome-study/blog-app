"use client"

import { instance } from "@/libs/axios"
import { BlogCommentsProps } from "@/models/definition"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation";
import { UserCommentLike } from "./UserCommentLike";

export const UserComment = ({ blogComment } : { blogComment : BlogCommentsProps}) => {
    const router = useRouter();
    const [user, setUser] = useState<any>(null)
    useEffect(() => {
        const getUser = async () => {
            try {
                // Get the names of each users comment
                const response = await instance.get("/api/getUsername", { params: { user_id : blogComment.commenter_id}});
                const user = response?.data;
                setUser(user)
            } catch(error) {
                if (error) return router.push('/Error');
            }
        }
        getUser()
    }, [blogComment.commenter_id, router]);

    return(
        <>
            <div className="">
                <div className="mb-5 flex items-center gap-5">
                    <div className="rounded-full h-10 w-10 bg-slate-900">

                    </div>
                    <div>
                        <h1 className="text-lg font-black">{user?.first_name} {user?.last_name} {blogComment.owner_id === blogComment.commenter_id && "(Creator)"}</h1>
                        <p className="text-sm text-gray-500 italic font-black">{user?.username}</p>
                    </div>
                </div>
                <p className="italic">{blogComment.comment}</p>
                <div className="mt-2">
                    <UserCommentLike comment_id={blogComment.id} owner_id={blogComment.owner_id}/>
                </div>
            </div>
        </>
    )
}