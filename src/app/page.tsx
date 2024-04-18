import { HomeComponent } from "@/components/home/home";
import { instance } from "@/libs/axios";

export default async function Home() {
  const response = await instance.get("/api/latestBlogs");
  const { latestBlogs } = response.data;
  return (
    <main className="py-5">
      <HomeComponent latestBlogs={latestBlogs}  />
    </main>
  );
}
