"use client"

import { instance } from "@/libs/axios"
import { BlogCommentsProps } from "@/models/definition"
import { useEffect, useState } from "react"
import { PiHandsClappingLight } from "react-icons/pi";
import { useRouter } from "next/navigation";

export const revalidate = 0

export const UserComment = ({ blogComment } : { blogComment : BlogCommentsProps}) => {
    const router = useRouter();
    const [user, setUser] = useState<any>(null)
    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await instance.get("/api/getUsername", { params: { user_id : blogComment.commenter_id}})
                setUser(response.data)
            } catch(error) {
                if (error) return router.push('/Error');
            }
        }

        getUser()

    }, [])


    return(
        <>
            <div className="">
                <div className="mb-5 flex items-center gap-5">
                    <div className="rounded-full h-10 w-10 bg-slate-900">

                    </div>
                    <div>
                        <h1 className="text-lg font-black">{user?.first_name} {user?.last_name} {blogComment.owner_id === blogComment.commenter_id && "(Creator)"}</h1>
                        <p className="text-sm text-gray-500 italic font-black">{user?.username}</p>
                    </div>
                </div>
                <p className="italic">{blogComment.comment}</p>
                <div className="mt-2">
                    <PiHandsClappingLight size={"1.7rem"} />
                </div>
            </div>
        </>
    )
}