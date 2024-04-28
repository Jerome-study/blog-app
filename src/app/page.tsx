import { HomeComponent } from "@/components/home/home";
import { Suspense } from "react";

export default async function Home() {
  return (
    <main className="py-5">
      <Suspense fallback={<h1>Loading</h1>}>
        <HomeComponent />
      </Suspense>
    </main>
  );
}
