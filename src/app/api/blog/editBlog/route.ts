import { NextRequest, NextResponse } from "next/server";
import { connectPostgres, pool } from "@/libs/database";
import queries from "@/libs/queries";
import slugify from "slugify";
import { verifyJwt } from "@/libs/jwtVerify";
import { isBlogExistFromUser } from "@/libs/isBlogExist";

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
        const { title, description, hasImage, blog_slug } = await request.json();
        // Check if Blog exist from the user 
        const isFound = await isBlogExistFromUser(blog_slug, user_id);
        if (!isFound) return NextResponse.json({ message: "This is not your blog" } , { status: 404 });
        // If one of the data is null return
        if (!title || !description || !blog_slug ) return NextResponse.json({ message: "All fields are required" }, { status : 203 });
        // Get the details of blog
        const blog = await (await pool.query(queries.getBlogDetails, [blog_slug])).rows[0];
        // If title is the same as before just use the current slug otherwise change it
        let slug = title === blog.title ? blog_slug : slugify(title);
        // 
        const isSlugFound : any = title === blog.title? false : (await pool.query(queries.isTitleFound, [title])).rowCount;
        slug = isSlugFound ? slug + `-${isSlugFound}` : slug;
        await pool.query(queries.editBlog, [title, description, hasImage, slug, blog.id, user_id]);
        return NextResponse.json({ success: true });
    } catch(error : any) {
        return NextResponse.json({}, { status: error.response.status || 500})
    }
}