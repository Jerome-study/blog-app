import { blogDetails } from "@/models/definition"
import { supabase } from "@/libs/supabase";
import { getImage } from "@/libs/utils";

export const ViewComponent = async ({ blog } : {blog : blogDetails}) => {
    const image = await getImage(blog.image, blog.id);
    const date = blog.created_at.toDateString();
    const time = blog.created_at.toLocaleTimeString();
    return(
        <>
            <section className="container max-w-screen-md">
                <div>
                    <h1 className="text-5xl font-black">{blog?.title}</h1>
                    <p className="text-sm my-2 text-slate-500">{date} {time}</p>
                </div>
                <img className="bg-zinc-900 my-5" src={image} alt="" />
            </section>
            <section className="container max-w-screen-md">
                <p className="text-2xl italic">{blog.description}</p>
            </section>
        </>
    )
}