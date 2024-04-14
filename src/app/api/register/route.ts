import { connectPostgres, pool } from "@/libs/database";
import { NextRequest, NextResponse } from "next/server";
import queries from "@/libs/queries";
import bcrypt from 'bcrypt';

export async function POST(request: NextRequest) {
    try {
        // Connect to database
        await connectPostgres();
        // Get the client data
        const { username, first_name, last_name, password, confirm_password } = await request.json();
        // Check if one of the data is null
        if (!username || !first_name || !password || !confirm_password) return NextResponse.json({ message: "All fields are required!" }, { status: 203 });
        // Check if password is match
        if (password !== confirm_password) return NextResponse.json({ message: "Password do not match!" }, { status: 203 });
        // Find if username is already taken
        const found = await pool.query(queries.getUsername, [username]);
        const userExist = found.rows[0];
        if (userExist) return NextResponse.json({ message: "Username already taken!", isUsername: true }, { status: 203 });
        // If username not exist, hashed password and insert in database
        const hashedPassword = await bcrypt.hash(password, 10);
        await pool.query(queries.registerUser, [username, first_name, last_name || "N/A", hashedPassword]);
        // send the message to the client
        return NextResponse.json({ message: "User has been registered!" }, { status: 200 });
    } catch(error : any) {
        return NextResponse.json({ message: error?.message }, { status: 500} )
    }
}