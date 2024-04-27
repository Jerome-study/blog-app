import { NextRequest, NextResponse } from "next/server";
import { connectPostgres, pool } from "@/libs/database";
import queries from "@/libs/queries";
import slugify from "slugify";
import { verifyJwt } from "@/libs/jwtVerify";

// Client Side who makes the request

export async function POST(request : NextRequest) {
    try {
        // Connect Database
        await connectPostgres();
        // Verify the access token and extract the user id from the accessToken if valid
        const decoded : any = await verifyJwt();
        if (decoded === 401) return NextResponse.json({ message: "Not Authorized" } , { status: 401 });
        if (decoded === 403) return NextResponse.json({ message: "Forbidden" } , { status: 403 });
        const { id : user_id } = decoded;
        // Get the data from the client
        const { title, description, hasImage } = await request.json();
        // If one of the data is null return
        if (!title || !description ) return NextResponse.json({ message: "All fields are required" }, { status : 203 });
        // Create slug
        let title_slug = slugify(title);
        // Check if Slug exist in database
        const isTitleFound = (await pool.query(queries.isTitleFound, [title])).rowCount;
        // If Title exist change it
        title_slug = isTitleFound? title_slug + `-${isTitleFound}` : title_slug;
        // Insert data from database
        const result = await pool.query(queries.insertBlogs, [title, description, hasImage, title_slug, user_id ]);
        const blog_id = result.rows[0].id;
        return NextResponse.json({ blog_id });
    } catch(error : any) {
       return NextResponse.json({}, { status: error.response.status})
    }
}