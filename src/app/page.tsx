import { LatestBlogs } from "@/components/home/home";
import { Suspense } from "react";

export default async function Home() {
  return (
    <main className="py-5">
      <section className="text-center px-3 lg:max-w-4xl lg:mx-auto">
        <h1 className="font-black text-5xl text-teal-950 my-10 lg:text-7xl">The Blog App</h1>
        <span className="text-zinc-500 text-xlfont-normal lg:text-3xl  ">A website that you can share your thoughts, opinion and no one even cares!</span>
      </section>
      <section className="py-10">
                <div className="container px-3">
                    <h1 className="font-black text-3xl mb-7 lg:text-4xl">Latest Blogs</h1>
                    <Suspense fallback={<h1>Loading</h1>}>
                      <LatestBlogs />
                    </Suspense>
                </div>
            </section>
    </main>
  );
}
