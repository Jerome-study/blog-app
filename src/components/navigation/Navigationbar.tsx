import { Navlinks } from "./Navlinks";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export const revalidate = 0

export const NavigationBar = async () => {
    const accessToken = cookies().get('jwt')?.value || "" ;
    
    const isAuthenticated = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET || "", (err) => {
        if (err) return false
        return true
    }) 

    return(
        <>
            <Navlinks isAuthenticated={isAuthenticated} />
        </>
    )
}