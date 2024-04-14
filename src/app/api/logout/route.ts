import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";



export async function POST() {
    // Logout
    cookies().delete("jwt");
    return NextResponse.json({ message: "Logout" });
}