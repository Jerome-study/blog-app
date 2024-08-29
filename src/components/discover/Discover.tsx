"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const Discovercomponent = () => {
    const [search, setSearch] = useState("");
    const router = useRouter();
    const handleClick = () => {
        router.push("/discover" + search)
    }

    return(
        <>
            <section className="container px-3 lg:px-0">
                <h1 className="text-4xl font-black uppercase my-5 text-center">Search Blog</h1>
                <div className="grid lg:grid-cols-12 gap-1">
                    <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" className="w-full lg:col-span-11 rounded-lg font-semibold" />
                    <button onClick={handleClick} className="bg-zinc-900 text-white lg:col-span-1 rounded-xl py-2">search</button>
                </div>
            </section>
        </>
    )
}