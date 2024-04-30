import { NavLinks } from "./Navlinks";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { instance } from "@/libs/axios";

export const revalidate = 0

export const NavigationBar = async () => {
    const accessToken = cookies().get('jwt')?.value || "" ;
    
    const isAuthenticated : any = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET || "", (err,decoded) => {
        if (err) return false
        return decoded;
    })

    const response = await instance.get(`/api/getUsername`, {
        params: {
            user_id : isAuthenticated.id
        }
    });
    const username = response.data.username || undefined;
    return(
        <>
            <NavLinks isAuthenticated={isAuthenticated} username={username} />
        </>
    )
}