import { pool } from "@/libs/database";
import queries from "@/libs/queries";
import { supabase } from "@/libs/supabase";
import { blogDetails, userDetails } from "@/models/definition";

export const Cards = async ({ blog } : { blog: blogDetails }) => {
    const response = await pool.query(queries.getUserDetails, [blog?.user_id]);
    const user: userDetails = response.rows[0];
    const image = blog?.image? supabase.storage.from("image-blog").getPublicUrl(`${blog.id}`).data.publicUrl : "/image-sample.jpg";
    return(
        <>
            <div className="border shadow rounded-xl">
              <div className="min-h-48 bg-no-repeat bg-cover bg-slate-950 rounded-t-xl" style={{ backgroundImage: `url("${image}")`}}>

              </div>
              <div className="py-5 px-3">
                <h1 className="font-bold text-2xl text-wrap overflow-hidden">{blog?.title}</h1>
                <p className="text-sm overflow-hidden">{blog?.description}</p>
                <div className="mt-5 flex gap-2 items-center">
                    <div className="rounded-full h-9 w-9 bg-zinc-500">

                    </div>
                    <div>
                      <h1 className="font-black block">{user.first_name + user.last_name}</h1>
                      <p className="block text-xs text-slate-500 font-black">{user.username}</p>
                    </div>
                </div>
              </div>
            </div>
        </>
    )
}