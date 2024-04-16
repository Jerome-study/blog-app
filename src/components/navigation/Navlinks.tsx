"use client"
import Link from "next/link"
import { usePathname } from 'next/navigation'
import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { GiTireIronCross } from "react-icons/gi";
import { DropDown } from "./Dropdown";
import styles from './nav.module.css';


export const Navlinks = ({ isAuthenticated, username } : { isAuthenticated : Boolean | any, username: string | undefined}) => {
    const pathname = usePathname();
    const [open, setOpen] = useState<boolean>(false);
    return(
            <div className={`${styles.font_family} bg-black py-6 px-3`}>
                <div className="flex justify-between items-center container z-50">
                    <h1 className="text-white font-bold text-2xl">Blog App</h1>
                    <div className={`${open ? "right-0 w-full  sm:w-4/6 md:w-max" : "w-0 -right-96 md:w-max " } z-50 flex flex-col items-center justify-center  gap-8 bg-black fixed top-0 bottom-0 md:pt-0 md:pl-0 md:static md:flex-row transition-all duration-300 ease-in-out`}>
                        <GiTireIronCross onClick={() => setOpen(prev => !prev)} className={`absolute top-0 right-0 mr-5 mt-7 md:hidden`} color="white" size={"1.7rem"} />
                        <h1>
                            <Link onClick={() => setOpen(prev => !prev)} className={`${pathname === '/' ? 'font-black' : 'hover:underline'} text-white  text-xl`} href={"/"}>Home</Link>
                        </h1>
                        <h1>
                            <Link onClick={() => setOpen(prev => !prev)} className={`${pathname === '/discover' ? 'font-black' : 'hover:underline'} text-white text-xl`} href={"/discover"}>Discover</Link>
                        </h1>
                        { (isAuthenticated && username) && 
                            <DropDown username={username} />
                        }
                       { (!isAuthenticated && !username) && 
                            <>
                                 <h1>
                                    <Link onClick={() => setOpen(prev => !prev)} className={`${pathname === '/login' ? 'font-black' : 'hover:underline'} text-white text-xl`} href={"/login"}>Login</Link>
                                </h1>
                                <h1>
                                    <Link onClick={() => setOpen(prev => !prev)} className={`${pathname === '/register' ? 'font-black' : 'hover:underline'} text-white text-xl`} href={"/register"}>Register</Link>
                                </h1>
                            </>
                       }
                    </div>
                    <RxHamburgerMenu onClick={() => setOpen(prev => !prev)} className="md:hidden" color="white" size={"2rem"} />
                </div>
            </div>
    )
}