import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/libs/database";
import queries from "@/libs/queries";

export const revalidate = 0;

export async function GET(request: NextRequest) {
    try {
        const slug = new URL(request.url).searchParams.get('slug');
        const data = await pool.query(queries.getBlogDetails, [slug]);
        if (!data.rowCount) return NextResponse.json({ messaeg: "Blog no content" }, { status: 203 });
        const blog = data.rows[0];
        const totalLikes = (await pool.query(queries.getBlogLikes, [blog.id])).rowCount;
        const comments = await pool.query(queries.getBlogComment, [blog.id]);
        const blogComments = comments.rows;
        const blogTotalComments = comments.rowCount;
        return NextResponse.json({ blog, totalLikes, blogComments, blogTotalComments });
    } catch(error : any) {
        return NextResponse.json({}, { status: error.response?.status || 500})
    }
}