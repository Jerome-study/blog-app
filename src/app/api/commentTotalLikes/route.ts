import { pool } from "@/libs/database";
import queries from "@/libs/queries";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const comment_id = new URL(request.url).searchParams.get('comment_id');
        const response = (await pool.query(queries.commentTotalLikes, [comment_id])).rowCount
        return NextResponse.json({ totalLikes : response});
    } catch(error : any) {
        return NextResponse.json({ }, { status : 500})
    }
}