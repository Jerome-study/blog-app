"use client"
import { useState } from "react";
import { LiaCommentsSolid } from "react-icons/lia";
import { CommentContainer } from "./CommentContainer";
import { BlogCommentsProps, blogDetails } from "@/models/definition";
import { createContext } from "react";

export const UserContext = createContext<any>({})

export const CommentComponent = ({ user_id, blog, blogTotalComments, blogComments } : { user_id: string, blog: blogDetails, blogTotalComments: number, blogComments: BlogCommentsProps[] }) => {
    const [showComment, setShowComment] = useState(false);

    return(
        <>
            <div className="flex gap-3">
                <LiaCommentsSolid onClick={() => setShowComment(prev => !prev)} size={"1.6rem"} className="cursor-pointer inline mr-1"  />
                <p>{blogTotalComments}</p>
            </div> 
            <UserContext.Provider value={{user_id}}>
                <CommentContainer showComment={showComment} setShowComment={setShowComment} blogComments={blogComments} blog={blog} />
            </UserContext.Provider>
        </>
    )
}