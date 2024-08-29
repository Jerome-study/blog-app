"use client"

import { BlogCommentsProps } from "@/models/definition"
import { memo, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation";
import { UserCommentLike } from "./UserCommentLike";
import { CiStar } from "react-icons/ci";
import { UserContext } from "./comment";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { Dots } from "./Dots";
import { useFetch } from "@/libs/useSWR";

const UserComment = ({ blogComment, gettingDeleted, setGettingDeleted } : { blogComment : BlogCommentsProps, gettingDeleted: string | null, setGettingDeleted: Function}) => {
    const router = useRouter();
    const { user_id } = useContext(UserContext);
    const { data : user, error, isLoading } = useFetch("/api/getUsername" +`?user_id=${blogComment.commenter_id}`)
    
    const handleClick = () => {
        if (gettingDeleted === blogComment.id) return setGettingDeleted("")
        setGettingDeleted(blogComment.id)
    }
    if (error) router.push("/Error")

    return(
        <>
            <div className="border-b pb-2">
                <div className="mb-1 flex items-center gap-2">
                    <div className="rounded-full h-8 w-8 bg-slate-900">

                    </div>
                    <div className="flex items-center justify-between w-full">
                        <div>
                            <div className="flex gap-2 items-center">
                                {isLoading && <div className="h-3.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-2"></div>}
                                {!isLoading && <h1 className="text-md font-semibold">{user.first_name} {user.last_name}</h1>}
                                {blogComment.owner_id === blogComment.commenter_id &&  <CiStar />}
                            </div>
                            {isLoading && <div className="h-3.5 bg-gray-200 rounded-full dark:bg-gray-700 w-20"></div>}
                            {!isLoading && <p className="text-sm text-gray-500 italic font-light">{user?.username}</p>}
                        </div>
                        {user_id === blogComment.commenter_id && 
                            <div className="relative">
                                <HiOutlineDotsVertical onClick={handleClick} className="cursor-pointer" />
                                { (gettingDeleted === blogComment.id) && <Dots comment_id={blogComment.id} commenter_id={blogComment.commenter_id} />}
                            </div>
                        
                        }
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

export default memo(UserComment)