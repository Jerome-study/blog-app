"use client"
import { blogDetails } from "@/models/definition"
import { useForm, SubmitHandler } from "react-hook-form";
import { blogSchema } from "@/models/zodSchema";
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { EditImageField } from "./ImageField";
import { instance } from "@/libs/axios";
import { supabase } from "@/libs/supabase";
import { useRouter } from "next/navigation";
import { Modal } from "@/components/ui/Modal";

type Inputs = z.infer<typeof blogSchema>

export const EditComponent = ({ blog, image  } : { blog : blogDetails | any, image: string}) => {
    const message = {
        title: blog.title,
        message: "Do you want to edit"
    }
    const router = useRouter();
    const [showModal, setShowModal] = useState(false);
    const [currentImage, setCurrentImage] = useState(blog.image ? image : null)
    const [file, setFile] = useState<File | null>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({
        resolver: zodResolver(blogSchema)
    })
    const onSubmit:SubmitHandler<any> = async (data) => {
        if (data.title === blog.title && blog.description === data.description && currentImage !== null) return router.push("/user/dashboard");
        if (!showModal) setShowModal(prev => !prev);
        if (!showModal) return;
        try {
            const hasImage = currentImage || file ? true : false;
            const response = await instance.post("/api/blog/editBlog", { ...data, hasImage, blog_slug : blog.slug});
            if (response.status === 203) return console.log(response.data.message);
    
            if (file && !blog.image) {
                const result = await supabase.storage.from('image-blog').upload(`${blog.id}`, file);
                if (result.error) throw new Error("Something went wrong upload");
            } else if (file && blog.image) {
                const result = await supabase.storage.from('image-blog').update(`${blog.id}`, file);
                if (result.error) throw new Error("Something went wrong");
            } else if (!file && !currentImage) {
                console.log("delete image")
                const result = await supabase.storage.from('image-blog').remove([`${blog.id}`]);
                if (result.error) throw new Error("Something went wrong");
            }
            
            window.location.href = "/user/dashboard";

        } catch(error : any) {
            console.log(error?.response?.data?.message);
            window.location.href = "/Error"
        }
    }
    
    return(
        <>
            { showModal && <Modal message={message} setState={setShowModal} handleClick={handleSubmit(onSubmit)} />}
            <section className="mt-12 container">
                <h1 className="w-full py-5 text-5xl font-black container text-center">Edit Blog</h1>
            </section>

            <form onSubmit={handleSubmit(onSubmit)} className="container mt-7 grid gap-5">
                <div className="grid gap-3">
                    <div className="flex items-center gap-1">
                        <h1 className="uppercase font-black text-2xl">Image</h1>
                        <p className="uppercase text-sm font-black text-gray-500">(optional)</p>
                    </div>
                    <EditImageField currentImage={currentImage} setFile={setFile} selectedImage={selectedImage} setCurrentImage={setCurrentImage} setSelectedImage={setSelectedImage} />
                </div>

                <div className="grid gap-3">
                    <h1 className="font-black text-2xl uppercase">Title</h1>
                    <input type="text" className="py-3 w-full font-bold text-md outline-none" 
                        {...register("title", { value: blog?.title })}
                    />
                    { errors.title && <span className="text-red-600 font-normal">{errors.title.message}</span>}
                </div>

                <div className="grid gap-3">
                    <h1 className="font-black text-2xl">Description</h1>
                    <textarea className="py-3 w-full resize-none text-md" rows={10} 
                        {...register("description", { value: blog?.description})}
                    />
                    { errors.description && <span className="text-red-600 font-normal">{errors.description.message}</span>}
                </div>
                <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                    <button type="submit" className="bg-amber-100 py-3 px-7 rounded-xl font-black">Save</button>
                    <Link href={"/"} className="text-center bg-rose-800 py-3 px-7 rounded-xl font-black text-white">Cancel</Link>
                </div>
            </form>
        </>
    )
}