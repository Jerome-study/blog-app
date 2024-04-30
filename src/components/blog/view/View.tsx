import { blogDetails } from "@/models/definition"
import { getImage } from "@/libs/utils";
import Image from "next/image";
import { LikeComponent } from "./Like";
import { verifyJwt } from "@/libs/jwtVerify";
import { instance } from "@/libs/axios";
import { CommentComponent } from "./comment";
import { BlogCommentsProps } from "@/models/definition";

export const ViewComponent = async ({ blog, totalLikes, blogComments, blogTotalComments } : {blog : blogDetails, totalLikes : number, blogComments: BlogCommentsProps[], blogTotalComments: number }) => {
    const image = await getImage(blog.image, blog.id);
    const date = new Date(blog?.created_at)?.toDateString();
    const time = new Date(blog?.created_at)?.toLocaleTimeString();
    const user: any  = await verifyJwt();
    const isLike = user === 403 || user === 401 ? false : (await instance.get("/api/isLike", { params : { liker_id : user.id, blog_id: blog.id }}))?.data?.result;
    
    return(
        <>
            <section className="container max-w-screen-md">
                <div>
                    <h1 className="text-4xl lg:text-5xl break-all font-black">{blog?.title}</h1>
                    <p className="text-sm my-2 text-slate-500">{date} {time}</p>
                </div>
                <Image className="bg-zinc-900 my-5 w-full" src={image} width={500} height={250} alt="blog-image" />
            </section>
            <section className="container max-w-screen-md">
                <div>
                    <p className="text-md md:text-xl italic break-words">{blog.description}</p>
                </div>
            </section>
            <section className="container max-w-screen-md mt-3 flex gap-4">
                <LikeComponent owner_id={blog.user_id} blog_id={blog.id} totalLikes={totalLikes} isLike={isLike}/>
                <CommentComponent user_id={user.id} blog={blog} blogTotalComments={blogTotalComments} blogComments={blogComments}/>
            </section>
        </>
    )
}