import Image from "next/image";

export const EditImageField = ({ currentImage, setFile, selectedImage, setSelectedImage, setCurrentImage } : any) => {

    const removeImage = (e : any) => {
        e.preventDefault();
        setCurrentImage(null);
        setSelectedImage(null);
        setFile(null);
    }

    const insertImage = (e : any) => {
        setFile(e.target.files[0]);
        setSelectedImage(URL.createObjectURL(e.target.files[0]))
    }

    return(
        <>
            { (!currentImage && !selectedImage )&& 
                <div className={`border-4 relative rounded-2xl`}>
                    <input onChange={(e : any) => insertImage(e)} type="file" className="cursor-pointer relative block opacity-0 w-full h-full p-20 z-50" />
                    <div className="text-center p-10 absolute top-0 right-0 left-0 m-auto">
                        <h1 className="text-4xl text-slate-700 font-black">Upload Image</h1>
                    </div>
                </div>
            }

            {(currentImage || selectedImage ) && 
                <div>
                    <button onClick={removeImage} className="bg-rose-800 py-3 px-7 rounded-xl font-black text-white w-fit mb-4">Remove Image</button>
                    <Image className="w-max md:max-w-screen-md md:mx-auto bg-zinc-950" src={ selectedImage || currentImage } width={500} height={250} alt="image-blog"/>   
                </div>
            
            }


        </>
    )
}