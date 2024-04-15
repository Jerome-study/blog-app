"use client"
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { LoginValues } from "@/models/definition";
import { loginFormSchema } from "@/models/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { instance } from "@/libs/axios";
import { useState } from "react";

type Inputs = z.infer<typeof loginFormSchema>

export const LoginForm = () => {
    const [validate, setValidate] = useState("");
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({
        resolver: zodResolver(loginFormSchema)
    }); 
    const onSubmit:SubmitHandler<LoginValues> = async (data) => {
        setValidate("");
        try {
            const response = await instance.post("/api/login", data);
            if (response.status === 203) {
                setValidate(response.data?.message);
            } else {
               window.location.href = "/"
            }
        } catch(error : any) {
            console.log(error?.response)
        }
    }

    return(
        <>
            <main className="py-5 lg:container lg:items-center grid lg:grid-cols-2 lg:min-h-screen">
                <section className="text-center px-3 lg:max-w-4xl lg:mx-auto">
                    <h1 className="font-black text-5xl text-teal-950 my-10 lg:text-7xl">The Blog App</h1>
                    <span className="text-zinc-500 text-xl font-normal lg:text-2xl hidden lg:block  ">A website that you can share your thoughts, opinion and no one even cares!</span>
                </section>
                <form onSubmit={handleSubmit(onSubmit)} className="px-3 grid gap-4 lg:border lg:py-10 rounded-3xl shadow">
                   <h1 className="font-black text-3xl text-teal-950 text-center mb-5 lg:text-5xl">Login</h1>
                   { validate && <span className="text-red-600 font-normal">{validate}</span>}
                   <div>
                        <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900">Username</label>
                        <input type="text" id="first_name" className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Username"  
                            {...register("username")}
                        />
                        { errors.username && <span className="text-red-600 font-normal">{errors.username.message}</span>}
                    </div>
                    <div>
                        <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                        <input type="password" id="first_name" className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="password"  
                            {...register("password")}
                        />
                        { errors.password && <span className="text-red-600 font-normal">{errors.password.message}</span>}
                    </div>
                    <button className="font-black py-2 bg-amber-100 rounded-xl hover:bg-amber-200 ">Login</button>
                    <span className="text-center">No account?<Link className="text-sky-600 hover:text-sky-900" href="/register">Register</Link></span>
                </form>
            </main>
        </>
    )
}