"use client"

import { instance } from "@/libs/axios"
import { BlogCommentsProps } from "@/models/definition"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation";
import { UserCommentLike } from "./UserCommentLike";
import { CiStar } from "react-icons/ci";

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
            <div className="border-b pb-2">
                <div className="mb-1 flex items-center gap-2">
                    <div className="rounded-full h-8 w-8 bg-slate-900">

                    </div>
                    <div>
                        <div className="flex gap-2 items-center">
                            <h1 className="text-md font-semibold">{user?.first_name} {user?.last_name}</h1>
                            {blogComment.owner_id === blogComment.commenter_id &&  <CiStar />}
                        </div>
                        <p className="text-sm text-gray-500 italic font-light">{user?.username}</p>
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