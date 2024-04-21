import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/libs/database";
import queries from "@/libs/queries";

export const revalidate = 0;

export async function GET(request: NextRequest) {
    try {
        const user_id = new URL(request.url).searchParams.get('user_id');
        const data = await pool.query(queries.getUserBlogsDesc, [user_id]);
        const totalLikes = (await pool.query(queries.getUserBlogTotalLikes, [user_id])).rowCount;
        const totalLiked = (await pool.query(queries.getUserBlogTotalLiked, [user_id])).rowCount
        return NextResponse.json({ blog: data, totalLikes, totalLiked });
    } catch(error) {

    }
}