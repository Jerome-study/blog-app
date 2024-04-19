import jwt from "jsonwebtoken";
import { supabase } from "./supabase";

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const signJwt = (id : string) => {
    return jwt.sign(
        { id },
        process.env.ACCESS_TOKEN_SECRET || "SECRET_KEY",
        { expiresIn: "1d"}
    )
}


export const getImage = async (hasImage : boolean, blog_id : string) => {
    return hasImage? `${supabase.storage.from("image-blog").getPublicUrl(`${blog_id}`).data.publicUrl}?bust=${Date.now()}` : "/image-sample.jpg";
}