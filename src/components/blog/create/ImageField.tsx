import Image from "next/image"
import { imageField } from "@/models/definition";

export const ImageField = ({ setFile, selectedImage, setSelectedImage } : imageField) => {
    const insertImage = (e : any) => {
        setFile(e.target.files[0]);
        setSelectedImage(URL.createObjectURL(e.target.files[0]))
    }

    const removeImage = () => {
        setFile(null);
        setSelectedImage(null)
    }

    return(
        <>
             <div className={`${selectedImage && "hidden"} border-4 relative rounded-2xl`}>
                <input type="file" onChange={(e : any) => insertImage(e)}  className="cursor-pointer relative block opacity-0 w-full h-full p-20 z-10" />
                <div className="text-center p-10 absolute top-0 right-0 left-0 m-auto">
                    <h1 className="text-4xl text-slate-700 font-black">{selectedImage ? "Replace Image" : "Upload Image"}</h1>
                 </div>
            </div>
            { selectedImage && 
                <>
                    <button onClick={removeImage} className="bg-rose-800 py-3 px-7 rounded-xl font-black text-white w-fit">Remove Image</button>
                    <Image className="w-max md:max-w-screen-md md:mx-auto" width={250} height={500} src={selectedImage} alt="image-blog"/>
                </>
            }

        </>
    )
}