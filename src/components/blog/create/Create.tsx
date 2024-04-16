"use client";
import { useState } from "react"
import { ImageField } from "./ImageField";
import { instance } from "@/libs/axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { blogSchema } from "@/models/zodSchema";
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { blogValues } from "@/models/definition";
import { supabase } from "@/libs/supabase";
import Link from "next/link";

type Inputs = z.infer<typeof blogSchema>

export const CreateComponent = () => {
    const [validate, setValidate] = useState<string>("");
    const [file, setFile] = useState<File | null>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({
        resolver: zodResolver(blogSchema)
    });

    const onSubmit:SubmitHandler<blogValues> = async (data) => {
        setValidate("");
        try {
            const hasImage = file? true : false
            console.log(selectedImage, file)
            const response = await instance.post("/api/createBlog", {...data, hasImage });
            if (response.status === 203) return setValidate(response.data.message);
            if (file) {
                const result = await supabase.storage.from('image-blog').upload(`${response.data.blog_id}`, file);
                if (result.error) throw new Error("Something went wrong");
            }
            window.location.href = "/dashboard";
        } catch(error : any) {
            console.log(error);
        }
    }

    return(
        <>
            <section className="mt-12 container">
                <h1 className="w-full py-5 text-5xl container text-center">New Blog</h1>
                { validate && <span className="text-red-600 font-normal">{validate}</span>}
            </section>
            
            <form onSubmit={handleSubmit(onSubmit)} className="container mt-7 grid gap-5">
                <div className="grid gap-3 ">
                    <h1 className="font-semibold text-3xl">Image <span className="text-xl">(optional)</span></h1>
                    <ImageField setFile={setFile} selectedImage={selectedImage} setSelectedImage={setSelectedImage}/>
                </div>

                <div className="grid gap-3">
                    <h1 className="font-semibold text-3xl">Title</h1>
                    <input type="text" className="py-3 w-full rounded-xl font-black text-2xl" 
                        {...register("title")}
                    />
                    { errors.title && <span className="text-red-600 font-normal">{errors.title.message}</span>}
                </div>

                <div className="grid gap-3">
                    <h1 className="font-semibold text-3xl">Description</h1>
                    <textarea className="py-3 w-full rounded-xl resize-none text-xl" rows={10} 
                        {...register("description")}
                    />
                    { errors.description && <span className="text-red-600 font-normal">{errors.description.message}</span>}
                </div>
                <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                    <button type="submit" className="bg-amber-100 py-3 px-7 rounded-xl font-black">Create</button>
                    <Link href={"/"} className="text-center bg-rose-800 py-3 px-7 rounded-xl font-black text-white">Cancel</Link>
                </div>
            </form>
        </>
    )
}