import { NextRequest, NextResponse } from "next/server";
import { connectPostgres, pool } from "@/libs/database";
import queries from "@/libs/queries";

export async function GET(request : NextRequest) {
    const user_id = new URL(request.url).searchParams.get('user_id')
    try {
        if (!user_id) return NextResponse.json({ username: "" });
        const foundUser = await pool.query(queries.getUserDetails, [user_id])
        const { username, first_name, last_name } = foundUser.rows[0];
        return NextResponse.json({ username, first_name, last_name  });
    } catch(error : any) {
        console.log(error?.message)
        return NextResponse.json({ username: "", error: error?.message }, { status: 200});
    }
}