import { verifyJwt } from "@/libs/jwtVerify";
import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/libs/database";
import queries from "@/libs/queries";

export async function POST(request: NextRequest) {
    try {
        const decoded : any = await verifyJwt();
        if (decoded === 401 || decoded === 403) return NextResponse.json({ message: "Please login first"}, { status : decoded === 401 ? 401 : 403 });
        const { blog_id, owner_id, like } = await request.json();
        const liker_id = decoded.id
        !like? await pool.query(queries.likeBlog, [blog_id, owner_id, liker_id]) : await pool.query(queries.unLikeBlog, [blog_id, owner_id, liker_id])
        return NextResponse.json({ success: true });
    } catch(error : any) {
        return NextResponse.json({}, { status: error.response.status || 500})
    }
}