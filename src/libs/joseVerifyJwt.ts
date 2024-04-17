import { jwtVerify } from "jose";
import { cookies } from "next/headers";


export const verifyJwtJose = async () => {
    const accessToken = cookies().get("jwt")?.value || "";
    if (!accessToken) return false;
    const key = new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET);
    try {
        const isAuthenticated = await jwtVerify(accessToken, key);
        if (isAuthenticated.payload) {
            return true
        } else {
            return false
        }
    } catch(error) {
        return false;
    }
}

