import { NextRequest, NextResponse } from "next/server";
import { connectPostgres, pool } from "@/libs/database";
import queries from "@/libs/queries";
import bcrypt from 'bcrypt';
import { cookies } from "next/headers";
import { signJwt } from "@/libs/utils";

export async function POST(request : NextRequest) {
    try {
        // Connect to database
        await connectPostgres();
        // Get the client data
        const { username ,password } = await request.json();
        // Check if one of the data is null
        if (!username && !password) return NextResponse.json({ message: "All fields are required" }, { status: 203 });
        // Find if username if exist
        const found = await pool.query(queries.getUsername, [username]);
        const user = found.rows[0];
        // If username not exist return message
        if (!user) return NextResponse.json({ message: "Username or password is wrong", isUsername: true }, { status: 203 });
        // If username exist compare hashed password
        const isMatched = await bcrypt.compare(password, user.password);
        // If not matched return message
        if (!isMatched) return NextResponse.json({ message: "Username or password is wrong", isUsername: true }, { status: 203 });
        // If match create token
        const accessToken = signJwt(user.id)
        cookies().set({
            name: "jwt",
            value: accessToken,
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
            secure: process.env.NODE_ENV !== "development",
            sameSite: 'none'
        })
        return NextResponse.json({ message: "Login" });
    } catch(error : any) {
       
    }
}