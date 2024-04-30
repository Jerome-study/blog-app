"use client"
import { BlogCardComponentProps } from "@/models/definition";
import { supabase } from "@/libs/supabase";
import { useRouter } from "next/navigation";
import { instance } from "@/libs/axios";
import { PiHandsClappingThin } from "react-icons/pi";
import { LiaCommentsSolid } from "react-icons/lia";
import { Modal } from "./Modal";
import { useEffect, useState } from "react";

export const BlogCard = ({ totalComment, totalLikes, image, inDashboard, user, blog } : BlogCardComponentProps) => {
    const [showModal, setShowModal] = useState(false);
    const router = useRouter();
    const message = {
        title: blog.title,
        message: "Do you want to delete"
    }
    const deleteBlog = async () => {
        try {
          if (blog.user_id !== user.id) throw new Error();
          await instance.post("/api/blog/deleteBlog", {
            blog_slug : blog.slug,
            blog_id : blog.id,
            user_id : user.id
          });
          if (blog.image) {
            const result = await supabase.storage.from('image-blog').remove([`${blog.id}`]);
            if (result.error) throw new Error('Image error');
          }
          router.refresh();
        } catch(error : any) {
            router.push("/Error");
        } finally {
            setShowModal(prev => !prev)
        }
      }
    
    useEffect(() => {
        document.body.style.overflow = showModal ? "hidden" : ""
    }, [showModal])

    return(
        <>
            { showModal && <Modal setState={setShowModal} message={message} handleClick={deleteBlog}/> }
            <div className=" w-full md:w-full border shadow rounded-md my-4 shadow mx-auto">
                <div onClick={() => window.location.href=`/blog/view/${blog.slug}`} className="cursor-pointer min-h-48 bg-no-repeat bg-cover bg-slate-950 rounded-t-md" style={{ backgroundImage: `url("${image}")`}}>

                </div>
                <div className="py-5 px-3">
                    <h1 className="font-bold text-2xl overflow-hidden">{blog?.title}</h1>
                    <p className="text-sm truncate">{blog?.description}</p>
                    { !inDashboard ? 
                            <div className="grid mt-3 gap-3 ">
                                <div className="flex gap-5">
                                    <div>
                                        <PiHandsClappingThin size={"1.6rem"} className="inline mr-1"  /> 
                                        <span>{totalLikes}</span>
                                    </div>
                                    <div>
                                        <LiaCommentsSolid size={"1.6rem"} className="inline mr-1"/>
                                        <span>{totalComment}</span>
                                    </div>
                                </div>
                                <div className="flex gap-2 items-center">
                                    <div className="rounded-full h-9 w-9 bg-zinc-500">
                                        {/* Avatar */}
                                    </div>
                                    <div>
                                        <h1 className="font-black block">{user.first_name + " " + user.last_name}</h1>
                                        <p className="block text-xs text-slate-500 font-black">{user.username}</p>
                                    </div> 
                                </div>
                            </div>
                            :
                            <div className="flex gap-4 mt-5 justify-center">
                                <button onClick={() => window.location.href=`/blog/edit/${blog.slug}`} className="bg-amber-100 rounded-xl py-2 font-black w-full">Edit</button>
                                <button onClick={() => setShowModal(prev => !prev)} className="bg-rose-800 rounded-xl py-2 text-white font-black w-full">Delete</button>
                            </div>
                        }
                </div>
            </div>
        </>
    )
}