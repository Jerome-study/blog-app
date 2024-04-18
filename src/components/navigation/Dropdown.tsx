"use client"
import 'flowbite';
import { instance } from '@/libs/axios';
import { useRouter } from 'next/navigation';

export const DropDown = ({ username } : { username: string | undefined}) => {
    const router = useRouter();
    const logout = async () => {
        try {
            await instance.post("/api/logout");
            window.location.reload();
        } catch(error: any) {
            console.log(error?.response)
        }
    }

    function onClick(destination: string) {
        window.location.href = destination;
      }

    return(
        <>
            <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="bg-amber-100 hover:bg-amber-200 font-black text-black rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center" type="button">{username}<svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                </svg>
            </button>
            <div id="dropdown" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                    <li onClick={() => onClick("/blog/create")}>
                        <p className="cursor-pointer block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Create Blog</p>
                    </li>
                    <li onClick={() => onClick("/user/dashboard")}>
                        <p className="cursor-pointer block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</p>
                    </li>
                    <li onClick={() => onClick("/settings")}>
                        <p className="cursor-pointer block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</p>
                    </li>
                    <li onClick={logout}>
                        <p className="cursor-pointer block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Logout</p>
                    </li>
                </ul>
            </div>
        </>
    )
}