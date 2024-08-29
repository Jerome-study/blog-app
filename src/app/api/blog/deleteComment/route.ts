import { pool } from "@/libs/database";
import queries from "@/libs/queries";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try{
        const { blog_id, user_id, comment_id } = await request.json();
        console.log(blog_id, user_id, comment_id);
        await pool.query(queries.deleteUserCommentLike, [comment_id]);
        await pool.query(queries.deleteUserComment, [blog_id, user_id, comment_id]);
        return NextResponse.json({ success: true });
    } catch(error : any) {
        return NextResponse.json({ message: error?.message || "something went wrong" }, { status: error?.response.status || 500})
    }
}