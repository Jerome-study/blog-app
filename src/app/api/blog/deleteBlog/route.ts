import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/libs/database";
import queries from "@/libs/queries";
import { isBlogExistFromUser } from "@/libs/isBlogExist";

// Client Side who makes the request

export async function POST(request : NextRequest) {
    
    try {
        const { blog_slug, user_id, blog_id } = await request.json();
        const isFound = await isBlogExistFromUser(blog_slug, user_id);
        if (!isFound) return NextResponse.json({ message: "This is not your blog" } , { status: 404 });
        await pool.query(queries.deleteBlogLike, [blog_id, user_id]);
        await pool.query(queries.deleteBlog, [blog_id, user_id]);
        return NextResponse.json({ success: true });
    } catch(error : any) {
        return NextResponse.json({}, { status: error.response.status || 500 })
    }
}