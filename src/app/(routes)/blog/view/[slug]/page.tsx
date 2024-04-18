import { pool } from "@/libs/database";
import queries from "@/libs/queries";
import { redirect } from "next/navigation";
import { ViewComponent } from "@/components/blog/view/View";

async function ViewBlogPage({ params } : { params: { slug : string}}) {
    const { slug } = params;
    const data = await pool.query(queries.getBlogDetails, [slug]);

    if (!data.rowCount) return redirect("/");

    const blog = data.rows[0];

    return(
        <>
            <main className="py-6 px-3">
                <ViewComponent blog={blog} />
            </main>
        </>
    )
}

export default ViewBlogPage;