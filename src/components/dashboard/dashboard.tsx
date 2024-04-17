import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { pool } from "@/libs/database";
import queries from "@/libs/queries";
import { DashboardCard } from "./dashBoardCard";
import { DashBoardCardProps, blogDetails } from "@/models/definition";
import { BlogCards } from "../ui/blogCards";

export const DashboardComponent = async () => {
    const accessToken = cookies().get('jwt')?.value || "" ;
    const decoded : any = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET || "", (err,decoded) => {
        if (err) return false
        return decoded;
    });
    const user_id = decoded.id;
    const data = await pool.query(queries.getUserBlogsDesc, [user_id]);
    const totalBlog = data.rowCount;
    const blogList = data.rows;
    const totalLikes = await blogList.reduce((total, blog) => total + Number(blog.likes) , 0)
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
                            <BlogCards key={blog.id} blog={blog} inDashboard={true}  />
                        )
                    })}
                </div>
            </section>
        </>
    )
}