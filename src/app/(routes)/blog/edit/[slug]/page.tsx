import { EditComponent } from "@/components/blog/edit/Edit";
import { verifyJwt } from "@/libs/jwtVerify";
import { redirect } from "next/navigation";
import { isBlogExistFromUser } from "@/libs/isBlogExist";
import { blogDetails } from "@/models/definition";
import { getImage } from "@/libs/utils";

async function EditPage({ params } : { params : { slug : string } }) {
    const { slug } = params
    const user: any  = await verifyJwt(); // Verify User
    if (!user) return redirect("/login"); // If no token or invalid token 

    const blog: blogDetails  = await isBlogExistFromUser(slug, user.id); // Check if the blog is exist from the user

    if (!blog) redirect("/user/dashboard");

    const image = await getImage(blog.image, blog.id);

    return(
        <>
            <main className="py-5 px-3">
                <EditComponent blog={blog} image={image} />                
            </main>
        </>
    )
};

export default EditPage;