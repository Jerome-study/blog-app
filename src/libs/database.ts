import { Pool } from "pg";
import queries from "./queries";

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;
const DB_NAME = process.env.DB_NAME;


export const pool = new Pool({
    connectionString: `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`
});


export const connectPostgres = async () => {
    try {
        await pool.connect();
        await pool.query(queries.createUserTable);
        await pool.query(queries.createBlogTable);
        console.log("Connected to database");
    } catch(error : any ) {
        console.log(error?.message);
    }
};







