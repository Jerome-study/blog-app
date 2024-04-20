import { pool } from "@/libs/database";
import queries from "@/libs/queries";
import { blogDetails, userDetails } from "@/models/definition";
import { BlogCard } from "./BlogCard";
import { getImage } from "@/libs/utils";


export const revalidate = 0;

export const BlogCardContainer = async ({ blog, inDashboard } : { blog: blogDetails, inDashboard: boolean | undefined }) => {
  const response = await pool.query(queries.getUserDetails, [blog?.user_id]);
  const user: userDetails = response.rows[0];
  const image = await getImage(blog.image, blog.id);
  
  return(
      <>
          <BlogCard image={image} inDashboard={inDashboard} user={user} blog={blog} />
      </>
  )
}