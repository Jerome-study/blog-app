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
import { Modal } from "@/components/ui/Modal";

type Inputs = z.infer<typeof blogSchema>

export const CreateComponent = () => {
    const [showModal, setShowModal] = useState(false);
    const [validate, setValidate] = useState<string>("");
    const [file, setFile] = useState<File | null>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({
        resolver: zodResolver(blogSchema)
    });
    const message = {
        message: "Do you want to create this blog",
        title: ""
    }

    const onSubmit:SubmitHandler<blogValues> = async (data) => {
        setValidate("");
        if (!showModal) setShowModal(prev => !prev);
        if (showModal === true) {
            try {
                const hasImage = file? true : false;
                const response = await instance.post("/api/blog/createBlog", {...data, hasImage });
                if (response.status === 203) return setValidate(response.data.message);
                const { blog_id } = response.data
                if (file) {
                    const result = await supabase.storage.from('image-blog').upload(`${blog_id}`, file);
                    if (result.error) throw new Error("Something went wrong");
                }
                window.location.href = "/user/dashboard"
            } catch(error : any) {
                if (error.response.status === 500) return console.log("Something went wrong to server");
                console.log(error?.response?.data?.message);
            } 
        }
    }

    return(
        <>
            { showModal && <Modal message={message} setState={setShowModal} handleClick={handleSubmit(onSubmit)} />}
            <section className="mt-12 container">
                <h1 className="w-full py-5 text-5xl font-black container text-center">New Blog</h1>
                { validate && <span className="text-red-600 font-normal">{validate}</span>}
            </section>
            
            <form onSubmit={handleSubmit(onSubmit)} className="container mt-7 grid gap-5">
                <div className="grid gap-3 ">
                    <div className="flex items-center gap-1">
                        <h1 className="uppercase font-black text-2xl">Image</h1>
                        <p className="uppercase text-sm font-black text-gray-500">(optional)</p>
                    </div>
                    <ImageField setFile={setFile} selectedImage={selectedImage} setSelectedImage={setSelectedImage}/>
                </div>

                <div className="grid gap-2">
                    <h1 className="font-black text-2xl uppercase">Title</h1>
                    <input type="text" className="py-3 w-full font-bold text-md outline-none" 
                        {...register("title")}
                    />
                    { errors.title && <span className="text-red-600 font-normal">{errors.title.message}</span>}
                </div>

                <div className="grid gap-3">
                    <h1 className="font-semibold text-3xl">Description</h1>
                    <textarea className="py-3 w-full resize-none text-md" rows={10} 
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