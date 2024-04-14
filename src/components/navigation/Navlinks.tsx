"use client"
import Link from "next/link"
import { usePathname } from 'next/navigation'
import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { GiTireIronCross } from "react-icons/gi";
import { DropDown } from "./Dropdown";
import styles from './nav.module.css';


export const Navlinks = ({ isAuthenticated } : { isAuthenticated : Boolean | any}) => {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    return(
            <div className={`${styles.font_family} bg-black py-6 px-3`}>
                <div className="flex justify-between items-center container">
                    <h1 className="text-white font-bold text-2xl">Blog App</h1>
                    <div className={`${open ? "right-0 w-full  sm:w-4/6 md:w-max" : "w-0 -right-96 md:w-max " } flex flex-col items-center justify-center  gap-5 bg-black fixed top-0 bottom-0 md:pt-0 md:pl-0 md:static md:flex-row transition-all duration-300 ease-in-out`}>
                        <GiTireIronCross onClick={() => setOpen(prev => !prev)} className={`absolute top-0 right-0 mr-5 mt-7 md:hidden`} color="white" size={"1.7rem"} />
                        <h1>
                            <Link onClick={() => setOpen(prev => !prev)} className={`${pathname === '/' ? 'underline' : 'hover:border-b'} text-white font-extralight text-xl`} href={"/"}>Home</Link>
                        </h1>
                        <h1>
                            <Link onClick={() => setOpen(prev => !prev)} className={`${pathname === '/discover' ? 'underline' : 'hover:border-b'} text-white font-extralight text-xl`} href={"/discover"}>Discover</Link>
                        </h1>
                        { isAuthenticated && 
                            <DropDown />
                        }
                       { !isAuthenticated && 
                            <>
                                 <h1>
                                    <Link onClick={() => setOpen(prev => !prev)} className={`${pathname === '/login' ? 'underline' : 'hover:border-b'} text-white font-extralight text-xl`} href={"/login"}>Login</Link>
                                </h1>
                                <h1>
                                    <Link onClick={() => setOpen(prev => !prev)} className={`${pathname === '/register' ? 'underline' : 'hover:border-b'} text-white font-extralight text-xl`} href={"/register"}>Register</Link>
                                </h1>
                            </>
                       }
                    </div>
                    <RxHamburgerMenu onClick={() => setOpen(prev => !prev)} className="md:hidden" color="white" size={"2rem"} />
                </div>
            </div>
    )
}