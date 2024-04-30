import { pool } from "@/libs/database";
import { verifyJwt } from "@/libs/jwtVerify";
import queries from "@/libs/queries";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const liker_id = new URL(request.url).searchParams.get('liker_id');
        const blog_id = new URL(request.url).searchParams.get('blog_id');
        const comment_id = new URL(request.url).searchParams.get('comment_id');
        const query = blog_id ? queries.isLike : queries.isCommentLike
        const category = blog_id ? blog_id : comment_id;
        const response = (await pool.query(query, [category, liker_id])).rowCount;
        const result = response? true : false
        return NextResponse.json({ result })
    } catch(error : any) {
        return NextResponse.json({}, { status: error.response?.status || 500})
    }
}