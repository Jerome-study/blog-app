import { NextRequest, NextResponse } from "next/server";
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
        const { title, description, hasImage, blog_slug } = await request.json();
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
       console.log(error?.message);
    }
}