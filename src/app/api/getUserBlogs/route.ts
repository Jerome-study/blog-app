import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/libs/database";
import queries from "@/libs/queries";

export const revalidate = 0;

export async function GET(request: NextRequest) {
    try {
        const user_id = new URL(request.url).searchParams.get('user_id');
        const data = await pool.query(queries.getUserBlogsDesc, [user_id]);
        return NextResponse.json({ blog: data});
    } catch(error) {

    }
}