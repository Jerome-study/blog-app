import { blogDetails } from "@/models/definition";
import { BlogCardContainer } from "@/components/ui/BlogCardContainer";

export const HomeComponent = async ({ latestBlogs } : { latestBlogs: blogDetails[]}) => {
    
    return(
        <>
            <section className="text-center px-3 lg:max-w-4xl lg:mx-auto">
                <h1 className="font-black text-5xl text-teal-950 my-10 lg:text-7xl">The Blog App</h1>
                <span className="text-zinc-500 text-xlfont-normal lg:text-3xl  ">A website that you can share your thoughts, opinion and no one even cares!</span>
            </section>
            <section className="py-10">
                <div className="container px-3">
                    <h1 className="font-black text-3xl mb-7 lg:text-4xl">Latest Blogs</h1>
                    { latestBlogs.length ? <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                        { latestBlogs.map(blog => {
                            return(
                                <BlogCardContainer key={blog.id} blog={blog} inDashboard={false} />
                            )
                        })}
                    </div> : 
                        <p className="text-center text-3xl text-slate-600">No Blogs</p>
                    }
                </div>
            </section>
        </>
    )
}