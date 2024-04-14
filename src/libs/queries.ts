const createUserTable = `CREATE TABLE IF NOT EXISTS users (
    id uuid PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    username VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
)`

const getUsername = `SELECT * FROM users WHERE username = $1`
const registerUser = `INSERT INTO users (username, first_name, last_name, password) VALUES($1, $2, $3, $4)`;
export default {
    createUserTable,
    getUsername,
    registerUser
}