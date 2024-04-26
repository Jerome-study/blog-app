import { redirect } from "next/navigation";
import { ViewComponent } from "@/components/blog/view/View";
import { instance } from "@/libs/axios";

async function ViewBlogPage({ params } : { params: { slug : string}}) {
    const { slug } = params;
    const response = await instance.get("/api/getBlog", { params : { slug }});
    if (response.status === 203) return redirect("/Error");
    const { blog, totalLikes, blogComments, blogTotalComments } = response?.data;
    
    return(
        <>
            <main className="py-6 px-3">
                <ViewComponent blog={blog} totalLikes={totalLikes} blogComments={blogComments} blogTotalComments={blogTotalComments} />
            </main>
        </>
    )
}

export default ViewBlogPage;