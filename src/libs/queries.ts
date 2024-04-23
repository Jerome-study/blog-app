const createUserTable = `CREATE TABLE IF NOT EXISTS users (
    id uuid PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    username VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
)`;

const createBlogTable = `CREATE TABLE IF NOT EXISTS blogs (
    id uuid PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    image BOOLEAN NOT NULL,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    user_id uuid,
    CONSTRAINT slug_unique UNIQUE (slug),
    FOREIGN KEY (user_id) REFERENCES users(id)
)`;

const createLikeTable = `CREATE TABLE IF NOT EXISTS likes (
    id uuid PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    blog_id uuid NOT NULL,
    owner_id uuid NOT NULL,
    liker_id uuid NOT NULL,
    FOREIGN KEY (blog_id) REFERENCES blogs(id)
)`;


const getUsername = `SELECT * FROM users WHERE username = $1`;
const registerUser = `INSERT INTO users (username, first_name, last_name, password) VALUES($1, $2, $3, $4)`;
const getUserDetails = `SELECT id, username, first_name, last_name, created_at FROM users WHERE id = $1`;
const isTitleFound = `SELECT * FROM blogs WHERE title = $1`;
const insertBlogs = `INSERT INTO blogs (title, description, image, slug,  user_id) VALUES ($1, $2, $3, $4, $5) RETURNING id`;
const getLatestBlogs = `SELECT * FROM blogs ORDER BY created_at DESC LIMIT 4`;
const getUserBlogsDesc = `SELECT * FROM blogs  WHERE user_id = $1 ORDER BY created_at DESC`;
const getBlogDetails = `SELECT * FROM blogs WHERE slug = $1`;
const isBlogExistFromUser = `SELECT * FROM blogs WHERE slug = $1 AND user_id = $2`;
const editBlog = `UPDATE blogs SET title =$1, description = $2, image = $3, slug = $4 WHERE id = $5 AND user_id = $6`;
const deleteBlog = `DELETE FROM blogs WHERE id = $1 AND user_id = $2`;
const deleteBlogLike = `DELETE FROM likes WHERE blog_id = $1 AND owner_id = $2`;
const getBlogLikes = `SELECT * FROM likes WHERE blog_id = $1`;
const getUserBlogTotalLikes = `SELECT * FROM likes WHERE owner_id = $1`;
const getUserBlogTotalLiked = ` SELECT * FROM likes WHERE liker_id = $1`;
const likeBlog = `INSERT INTO likes (blog_id, owner_id, liker_id) VALUES($1, $2, $3)`;
const unLikeBlog = `DELETE FROM likes WHERE blog_id = $1 AND owner_id = $2 AND liker_id = $3`;
const isLike = `SELECT * FROM likes WHERE blog_id =$1 AND liker_id = $2`;

const queries = {
    getUsername,
    createUserTable,
    createBlogTable,
    createLikeTable,
    registerUser,
    getUserDetails,
    isTitleFound,
    insertBlogs,
    getLatestBlogs,
    getUserBlogsDesc,
    getBlogDetails,
    isBlogExistFromUser,
    editBlog,
    deleteBlog,
    deleteBlogLike,
    getBlogLikes,
    getUserBlogTotalLikes,
    getUserBlogTotalLiked,
    likeBlog,
    unLikeBlog,
    isLike
}

export default queries