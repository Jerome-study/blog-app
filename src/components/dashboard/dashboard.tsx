import { DashboardCard } from "./dashBoardCard";
import { DashBoardCardProps, blogDetails } from "@/models/definition";
import { BlogCardContainer } from "../ui/BlogCardContainer";
import { verifyJwt } from "@/libs/jwtVerify";
import { redirect } from "next/navigation";
import { instance } from "@/libs/axios";

export const revalidate = 0;

export const DashboardComponent = async () => {
    const decoded : any = await verifyJwt();
    if (decoded === 401 || decoded === 403 ) return redirect("/login"); // If no token or invalid token 
    const user_id = decoded.id;
    const response = await instance.get("/api/getUserBlogs", { params : { user_id }})
    const totalBlog = response.data.blog.rowCount;
    const blogList = response.data.blog.rows;
    const totalLikes = await blogList.reduce((total : number, blog : blogDetails) => total + Number(blog.likes) , 0)
    const dashboardCards = [
        {
            name: "Total Blogs",
            totalCount: totalBlog,
        },
        {
            name: "Total Likes",
            totalCount: totalLikes
        }
    ]
    return(
        <>
            <section className="container px-3">
                <h1 className="text-4xl font-light text-center">Dashboard</h1>

                <div className="grid grid-cols-2 gap-5 mt-12 max-w-screen-sm mx-auto">
                    {dashboardCards.map((dashBoardCard : DashBoardCardProps) => {
                        return(
                            <DashboardCard key={dashBoardCard.name} dashBoardCard={dashBoardCard} />
                        )
                    })}
                </div>
            </section>

            <section className="container px-3 mt-12">
                <h1 className="text-4xl font-light">Your Blogs</h1>

                <div className="flex flex-shrink-0 gap-4 overflow-auto md:grid md:grid-cols-3 lg:grid-cols-4">
                    {blogList.map((blog : blogDetails) => {
                        return(
                            <BlogCardContainer key={blog.id} blog={blog} inDashboard={true}  />
                        )
                    })}
                </div>
            </section>
        </>
    )
}