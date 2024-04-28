import { HomeComponent } from "@/components/home/home";
export const revalidate = 0;

export default async function Home() {
  const result = await fetch(`${process.env.BASE_URL}/api/latestBlogs`);
  const response = await result.json();
  const { latestBlogs } = response;
  return (
    <main className="py-5">
      <HomeComponent latestBlogs={latestBlogs}  />
    </main>
  );
}
