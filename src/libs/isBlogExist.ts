import { pool } from "./database";
import queries from "./queries";


export const isBlogExistFromUser = async (slug : string, user_id : string) => {
    const data = await pool.query(queries.isBlogExistFromUser, [slug, user_id]);
    if (!data.rowCount) return false;
    return data.rows[0];
}