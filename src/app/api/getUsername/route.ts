import { NextRequest, NextResponse } from "next/server";
import { connectPostgres, pool } from "@/libs/database";
import queries from "@/libs/queries";

export async function GET(request : NextRequest) {
    try {
        const user_id = new URL(request.url).searchParams.get('user_id')
        if (!user_id) return NextResponse.json({ username: "" });
        const foundUser = await pool.query(queries.getUserDetails, [user_id])
        const { username } = foundUser.rows[0];
        return NextResponse.json({ username });
    } catch(error : any) {
        return NextResponse.json({ username: "" });
    }
}