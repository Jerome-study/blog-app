import { pool } from "@/libs/database";
import { verifyJwt } from "@/libs/jwtVerify";
import queries from "@/libs/queries";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const decoded : any = await verifyJwt();
        if (decoded === 401 || decoded === 403 ) return NextResponse.json({ message: "You are not authenticated (route)" }, { status: decoded});
        const { comment, blog_id, owner_id } = await request.json();
        if (!comment) return NextResponse.json({ message: "Please put a comment!" }, { status: 203 });
        await pool.query(queries.postComment, [blog_id, owner_id, decoded.id, comment]);
        return NextResponse.json({ success: true });
    } catch(error) {

    }
}