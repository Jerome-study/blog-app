"use client"
import { useState } from "react"
import { Spinner } from "../loading/spinner";

export const Modal = ({ setState, message, handleClick } : { setState : Function, message: any, handleClick: Function }) => {
    const [loading, setLoading] = useState(false);

    const performClick = async () => {
        setLoading(true);
        await handleClick();
        setLoading(false);
    }

    return(
        <>
           <div className="fixed min-h-screen inset-0 backdrop-brightness-50 z-50 flex justify-center items-center">
                <div className="bg-slate-950 h-max p-5 rounded-lg">
                    <p className="text-white text-xl">{message.message} <span className="font-black">{message.title}</span></p>
                    { loading && <Spinner />}
                    <div className="mt-2 grid gap-4 grid-cols-2">
                        <button disabled={loading} onClick={performClick} className="bg-amber-100 py-2 rounded-xl font-black">Yes</button>
                        <button disabled={loading} onClick={() => setState((prev : any ) => !prev)} className="bg-rose-800 text-white py-2 rounded-xl font-black">No</button>
                    </div>
                </div>
           </div>
        </>
    )
}