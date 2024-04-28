import { HomeComponent } from "@/components/home/home";

export const revalidate = 0;

export default async function Home() {
  return (
    <main className="py-5">
      <HomeComponent />
    </main>
  );
}
