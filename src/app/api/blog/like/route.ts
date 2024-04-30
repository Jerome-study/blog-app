import { verifyJwt } from "@/libs/jwtVerify";
import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/libs/database";
import queries from "@/libs/queries";

export async function POST(request: NextRequest) {
    try {
        const decoded : any = await verifyJwt();
        if (decoded === 401 || decoded === 403) return NextResponse.json({ message: "Please login first"}, { status : decoded === 401 ? 401 : 403 });
        const { blog_id, comment_id, owner_id, like } = await request.json();
        const liker_id = decoded.id
        const category = blog_id ? blog_id : comment_id
        const like_query = blog_id ? queries.likeBlog : queries.likeComment;
        const unlike_query = blog_id? queries.unLikeBlog : queries.unlikeComment
        !like? await pool.query(like_query, [category, owner_id, liker_id]) : await pool.query(unlike_query, [category, owner_id, liker_id])
        return NextResponse.json({ success: true });
    } catch(error : any) {
        console.log(error.message)
        return NextResponse.json({}, { status: error.response.status || 500})
    }
}