import { NextRequest, NextResponse } from "next/server";
import { pool, connectPostgres } from "@/libs/database";
import queries from "@/libs/queries";

export async function GET(request: NextRequest) {
    try {
        await connectPostgres();
        const response = await pool.query(queries.getLatestBlogs);
        const latestBlogs = response.rows;
        return NextResponse.json({ latestBlogs });
    } catch(error : any) {
        return NextResponse.json({}, { status: error.response.status || 500})
    }
}