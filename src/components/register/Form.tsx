"use client"
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { RegisterValues } from "@/models/definition";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerFormSchema } from "@/models/zodSchema";
import { instance } from "@/libs/axios";
import { useState } from "react";
import { useRouter } from 'next/navigation'

type Inputs = z.infer<typeof registerFormSchema>

export const RegisterForm = () => {
    const router = useRouter()
    const [userTaken, setUsertaken] = useState("")
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({
        resolver: zodResolver(registerFormSchema)
    });

    const onSubmit: SubmitHandler<RegisterValues> = async (data) => {
        setUsertaken("")
        try {
            const response = await instance.post("/api/register", data);
            if (response.status === 203 && !response.data.isUsername) {
                console.log(response.data.message);
            } else if (response.status === 203 && response.data.isUsername) {
                setUsertaken(response?.data?.message);
            } else {
                router.push('/login')
            }
        } catch(error : any) {
            console.log(error?.response);
        }
    };

    return(
        <>
            <main className="py-5 lg:container lg:items-center grid lg:grid-cols-2 lg:min-h-screen">
                <section className="text-center px-3 lg:max-w-4xl lg:mx-auto lg:order-2">
                    <h1 className="font-black text-5xl text-teal-950 my-10 lg:text-7xl">The Blog App</h1>
                    <span className="text-zinc-500 text-xl font-normal lg:text-2xl hidden lg:block  ">A website that you can share your thoughts, opinion and no one even cares!</span>
                </section>
                <div className="px-3 lg:border lg:py-10 lg:rounded-3xl lg:shadow lg:order-1">
                   <h1 className="font-black text-3xl text-teal-950 text-center mb-5 lg:text-5xl">Register</h1>
                   <form onSubmit={handleSubmit(onSubmit)} className="grid lg:grid-cols-2 gap-4 ">
                        <div>
                            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900">Username</label>
                            <input type="text"className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Username"  
                                {...register("username")}
                            />
                            { userTaken && <span className="text-red-600 font-normal">{userTaken}</span>}
                            { errors.username && <span className="text-red-600 font-normal">{errors.username.message}</span>}
                        </div>
                        <div>
                            <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900">First Name</label>
                            <input type="text" className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="First Name"  
                                {...register("first_name")}
                            />
                            { errors.first_name && <span className="text-red-600 font-normal">{errors.first_name.message}</span>}
                        </div>
                        <div>
                            <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900">Last Name (Optional)</label>
                            <input type="text" className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Last Name"  
                                {...register("last_name")}
                            />
                            { errors.last_name && <span className="text-red-600 font-normal">{errors.last_name.message}</span>}
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                            <input type="password" className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="password"  
                                {...register("password")}
                            />
                            { errors.password && <span className="text-red-600 font-normal">{errors.password.message}</span>}
                        </div>
                        <div>
                            <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-gray-900">Confirm Password</label>
                            <input type="password" className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Confirm Password"  
                                {...register("confirm_password")}
                            />
                            { errors.confirm_password && <span className="text-red-600 font-normal">{errors.confirm_password.message}</span>}
                        </div>
                        <button type="submit" className="font-black py-2 lg:h-max lg:mt-auto bg-amber-100 rounded-xl hover:bg-amber-200 ">Register</button>
                   </form>
                    <div className="text-center mt-5">
                        <span>Already have an account? <Link className="text-sky-600 hover:text-sky-900" href="/login">Login</Link></span>
                    </div> 
                </div>
            </main>
        </>
    )
}