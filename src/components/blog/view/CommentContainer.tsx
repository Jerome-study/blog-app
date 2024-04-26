"use client"
import { instance } from "@/libs/axios";
import { BlogCommentsProps, blogDetails } from "@/models/definition";
import { useState } from "react";
import { GiCrossMark } from "react-icons/gi";
export const CommentContainer = ({ blog, showComment, setShowComment, blogComments }: { blog : blogDetails ,showComment: boolean, setShowComment: Function, blogComments: BlogCommentsProps[] } ) => {
    const [comment, setComment] = useState("");
    const [validate, setValidate] = useState("")
    const postComment = async () => {
        setValidate("");
        if (!comment) return setValidate("Please put a comment!")
        try {
            const response = await instance.post("/api/blog/postComment", { comment, owner_id: blog.user_id, blog_id: blog.id });
            if (response.status === 203) return setValidate(response.data.message);
            console.log(response.data.success);
        } catch(error : any) {
            if (error.response.status === 401 || error.response.status === 403) return alert(error.response.data.message)
        }
    }

    return(
        <>
            <div className={`${showComment ? "w-full left-0 backdrop-brightness-50" : "-left-96"} transition-all fixed top-0 bottom-0 z-50`}>
                <div className={`${showComment ? "w-full sm:w-3/4 md:w-2/4 lg:w-1/4" : "-w-96"} transition-all fixed top-0 bg-white bottom-0 p-5`}>
                    <GiCrossMark className="ms-auto cursor-pointer" size={"2rem"} onClick={() => setShowComment((prev : boolean ) => !prev)}/>
                    <h1 className="text-center text-2xl font-black">Blog App</h1>

                    <div className="mt-5">
                        <div>
                            {validate && <span className="text-rose-800 ">{validate}</span>}
                            <textarea value={comment} onChange={(e : any) => setComment(e.target.value)} rows={4} className="resize-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
                            <button onClick={postComment} className="mt-2 bg-blue-600 p-2 rounded-lg text-white">Post Comment</button>
                        </div>

                        <div className="grid mt-12 text-gray-500">
                           {blogComments.length === 0 && <span>No Comment</span>} 

                           { blogComments.map(user => {
                                return(
                                    <>
                                        <h1>{user.comment}</h1>
                                    </>
                                )
                           })}
                        </div>


                    </div>

                </div>
            </div>
        </>
    )
}