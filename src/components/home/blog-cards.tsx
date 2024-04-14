import Image from "next/image";
import image from "../../../public/image-sample.jpg";

export const Cards = () => {
    return(
        <>
            <div className="border shadow rounded">
              <Image className="rounded-t" src={image} alt="image-sample" />
              <div className="py-5 px-3">
                <h1 className="font-bold text-2xl">The Blog Title</h1>
                <p className="text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Error unde nostrum ea ipsa placeat aspernatur sint maxime doloremque. Illum tempore corporis obcaecati unde recusandae magnam.</p>
                <div className="mt-5 flex gap-2">
                    <div className="rounded-full h-9 w-9 bg-zinc-500">

                    </div>
                    <h1 className="font-black">blogger name</h1>
                </div>
              </div>
            </div>
        </>
    )
}