"use client"
import { instance } from "@/libs/axios";
import { BlogCommentsProps, blogDetails } from "@/models/definition";
import { useState } from "react";
import { GiCrossMark } from "react-icons/gi";
import { UserComment } from "./user";
import { Spinner } from "@/components/loading/spinner";

export const CommentContainer = ({ blog, showComment, setShowComment, blogComments }: { blog : blogDetails ,showComment: boolean, setShowComment: Function, blogComments: BlogCommentsProps[] } ) => {
    const [comment, setComment] = useState("");
    const [commentLoading, setCommentLoading] = useState(false)
    const [validate, setValidate] = useState("")
    const [userComments, setUserComments] = useState(blogComments);
    const postComment = async () => {
        setValidate("");
        if (!comment) return setValidate("Please put a comment!");
        setCommentLoading(true)
        try {
            const response = await instance.post("/api/blog/postComment", { comment, owner_id: blog.user_id, blog_id: blog.id });
            if (response.status === 203) return setValidate(response.data.message);
            setUserComments(response.data.newComments);
            setComment("");
        } catch(error : any) {
            if (error.response.status === 401 || error.response.status === 403) return alert(error.response.data.message)
        } finally {
            setCommentLoading(false)
        }
    }

    return(
        <>
            <div className={`${showComment ? "w-full left-0 " : "hidden"} transition-all fixed top-0 bottom-0 z-50`}>
                <div className={`${showComment ? "w-full sm:w-3/4 md:w-2/4 xl:w-4/12" : "-w-96"} transition-all fixed top-0 bg-white bottom-0 p-5 overflow-auto`}>
                    <GiCrossMark className="ms-auto cursor-pointer" size={"2rem"} onClick={() => setShowComment((prev : boolean ) => !prev)}/>
                    <h1 className="text-center text-2xl font-black">Blog App</h1>

                    <div className="mt-5">
                        <div>
                            {validate && <span className="text-rose-800 ">{validate}</span>}
                            <textarea value={comment} onChange={(e : any) => setComment(e.target.value)} rows={4} className="resize-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
                            <button disabled={commentLoading} onClick={postComment} className="mt-2 bg-blue-600 p-2 rounded-lg text-white">{commentLoading ? <Spinner /> : "Post Comment"}</button>
                        </div>

                        <div className="grid mt-12 gap-5">
                           {blogComments.length === 0 && <span className="text-gray-500">No Comment</span>} 

                           { userComments.map(blogComment => {
                                return(
                                    <UserComment key={blogComment.id} blogComment={blogComment} />
                                )
                           })}
                           
                        </div>


                    </div>

                </div>
            </div>
        </>
    )
}