import { BlogCardContainer } from "@/components/ui/BlogCardContainer";
import { blogDetails } from "@/models/definition";
import { instance } from "@/libs/axios";
import { supabase } from "@/libs/supabase";

async function getLatestBlogs() {
    const response = await instance.get(`${process.env.BASE_URL}/api/latestBlogs`);
    return response.data.latestBlogs || [];
}

export const LatestBlogs = async () => {
    const latestBlogs = await getLatestBlogs();
    return(
        <>
                    { latestBlogs.length ? 
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                        { latestBlogs.map((blog : blogDetails ) => {
                            return(
                                <BlogCardContainer key={blog.id} blog={blog} inDashboard={false} />
                            )
                        })}
                    </div> : 
                        <p className="text-center text-3xl text-slate-600">No Blogs</p>
                    }
        </>
    )
}