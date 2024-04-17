import { CreateComponent } from "@/components/blog/create/Create";

async function CreateBlogPage() {
    return(
        <>
            <main className="py-5 px-3">
                <CreateComponent />
            </main>
        </>
    )
};

export default CreateBlogPage;