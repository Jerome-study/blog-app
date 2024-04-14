import { z } from "zod";

export const registerFormSchema = z.object({
    username: z.string({
        required_error: "First Name is required"
    }).min(3, { message: "Username must be 3 or higher "}),
    first_name: z.string({
        required_error: "This filed is required"
    }).min(1, { message:"This filed is required"}),
    last_name: z.string(),
    password: z.string({
        required_error: "Password is required"
    }).min(6, { message: "Password must be 6 or more characters"}),
    confirm_password: z.string({
        required_error: "Confirm password is required"
    }).min(6, { message: "Confirm password must be 6 or more characters"})
}).refine((data) => {
    return data.password === data.confirm_password
}, {
    message: "Password do not match!",
    path: ["confirm_password"]
});

export const loginFormSchema = z.object({
    username: z.string({
        required_error: "This field is required"
    }).min(1, { message: "This field is required" }),
    password: z.string({
        required_error: "This field is required"
    }).min(1, { message: "This field is required"})
})