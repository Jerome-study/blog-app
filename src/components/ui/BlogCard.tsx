"use client"
import { BlogCardComponentProps } from "@/models/definition"

export const BlogCard = ({ image, inDashboard, user, blog } : BlogCardComponentProps) => {
    return(
        <>
            <div onClick={() => window.location.href=`/blog/view/${blog.slug}`} className="cursor-pointer shrink-0 w-72 md:w-full border shadow rounded-lg my-4 shadow mx-auto">
                <div className="min-h-48 bg-no-repeat bg-cover bg-slate-950 rounded-t-lg" style={{ backgroundImage: `url("${image}")`}}>

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
                        null
                    }

                </div>
            </div>
        </>
    )
}