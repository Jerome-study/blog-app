import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/libs/supabase";
import { connectPostgres, pool } from "@/libs/database";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import queries from "@/libs/queries";
import slugify from "slugify";

// Client Side who makes the request

export async function POST(request : NextRequest) {
    try {
        // Connect Database
        await connectPostgres();
        // Get Access Token
        const accessToken = cookies().get("jwt")?.value;
        // If not valid return a 401 status
        if (!accessToken) return NextResponse.json({ message: "Not Authorized" }, { status: 401 });
        // Extract the user id from the accessToken
        const { id : user_id} : any = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET || "", (err, decoded) => {
            if (err) return NextResponse.json({ message: "Forbidden" }, { status: 403 });
            return decoded
        })
        // Get the data from the client
        const { title, description, hasImage } = await request.json();
        // If one of the data is null return
        if (!title || !description ) return NextResponse.json({ message: "All fields are required" }, { status : 203 });
        // Create slug
        let title_slug = slugify(title);
        // Check if Slug exist in database
        const isSlugFound = (await pool.query(queries.isSlugFound, [title_slug])).rowCount;
        // If slug exist change it
        title_slug = isSlugFound? title_slug + `-${isSlugFound}` : title_slug;
        // Insert data from database
        const result = await pool.query(queries.insertBlogs, [title, description, hasImage, title_slug, user_id ]);
        const blog_id = result.rows[0].id;
        return NextResponse.json({ blog_id });
    } catch(error : any) {
       console.log(error?.message);
    }
}