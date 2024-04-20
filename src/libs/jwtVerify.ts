import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export const verifyJwt = async () => {
    const accessToken = cookies().get("jwt")?.value || "";
    if (!accessToken) return 401;
    return jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET || "", (err, decoded) => {
        if (err) return 403;
        return decoded
    })
}

