import { pool } from "@/libs/database";
import queries from "@/libs/queries";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const liker_id = new URL(request.url).searchParams.get('liker_id');
        const blog_id = new URL(request.url).searchParams.get('blog_id');
        const response = (await pool.query(queries.isLike, [blog_id, liker_id])).rowCount;
        const result = response? true : false
        return NextResponse.json({ result })
    } catch(error : any) {
        return NextResponse.json({}, { status: error.response?.status || 500})
    }
}