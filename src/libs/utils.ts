import jwt from "jsonwebtoken";


export const signJwt = (id : string) => {
    return jwt.sign(
        { id },
        process.env.ACCESS_TOKEN_SECRET || "SECRET_KEY",
        { expiresIn: "1d"}
    )
}


