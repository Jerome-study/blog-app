import { blogDetails } from "@/models/definition"
import { getImage } from "@/libs/utils";
import Image from "next/image";

export const revalidate = 0;

export const ViewComponent = async ({ blog } : {blog : blogDetails}) => {
    const image = await getImage(blog.image, blog.id);
    const date = blog.created_at.toDateString();
    const time = blog.created_at.toLocaleTimeString();
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
        </>
    )
}