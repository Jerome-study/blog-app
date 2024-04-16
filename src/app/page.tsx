import { HomeComponent } from "@/components/home/home";
import { pool } from "@/libs/database";
import queries from "@/libs/queries";

export default async function Home() {
  const response = await pool.query(queries.getLatestBlogs);
  const latestBlogs = response.rows;
  return (
    <main className="py-5">
      <HomeComponent latestBlogs={latestBlogs} />
    </main>
  );
}
