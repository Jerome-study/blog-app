"use client"
import { BlogCardComponentProps } from "@/models/definition"

export const BlogCard = ({ image, inDashboard, user, blog } : BlogCardComponentProps) => {
    return(
        <>
            <div className=" shrink-0 w-72 md:w-full border shadow rounded-lg my-4 shadow mx-auto">
                <div onClick={() => window.location.href=`/blog/view/${blog.slug}`} className="cursor-pointer min-h-48 bg-no-repeat bg-cover bg-slate-950 rounded-t-lg" style={{ backgroundImage: `url("${image}")`}}>

                </div>
                <div className="py-5 px-3">
                    <h1 className="font-bold text-2xl overflow-hidden">{blog?.title}</h1>
                    <p className="text-sm text-nowrap overflow-hidden">{blog?.description}</p>
                    { !inDashboard ? 
                            <div className="mt-5 flex gap-2 items-center">
                                <div className="rounded-full h-9 w-9 bg-zinc-500">
            
                                </div>
                                <div>
                                    <h1 className="font-black block">{user.first_name + " " + user.last_name}</h1>
                                    <p className="block text-xs text-slate-500 font-black">{user.username}</p>
                                </div> 
                            </div>
                            :
                            <div className="flex gap-4 mt-5 justify-center">
                                <button onClick={() => window.location.href=`/blog/edit/${blog.slug}`} className="bg-amber-100 rounded-xl py-2 font-black w-full">Edit</button>
                                <button className="bg-rose-800 rounded-xl py-2 text-white font-black w-full">Delete</button>
                            </div>
                        }
                </div>
            </div>
        </>
    )
}