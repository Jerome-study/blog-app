"use client"
import { useState } from "react";
import { LiaCommentsSolid } from "react-icons/lia";
import { CommentContainer } from "./CommentContainer";
import { BlogCommentsProps, blogDetails } from "@/models/definition";
export const CommentComponent = ({ blog, blogTotalComments, blogComments } : { blog: blogDetails, blogTotalComments: number, blogComments: BlogCommentsProps[] }) => {
    const [showComment, setShowComment] = useState(false);

    return(
        <>
            <div className="flex gap-3">
                <LiaCommentsSolid onClick={() => setShowComment(prev => !prev)} size={"1.6rem"} className="cursor-pointer inline mr-1"  />
                <p>{blogTotalComments}</p>
            </div> 
            <CommentContainer showComment={showComment} setShowComment={setShowComment} blogComments={blogComments} blog={blog} />
        </>
    )
}