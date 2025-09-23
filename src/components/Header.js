"use client";

import { useAuth } from "@/context/AuthContext";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Header() {


    const pathname = usePathname();

    const [open, setOpen] = useState(false);

    const { logout } = useAuth(); // Access the logout function from your context

    const handleLogout = () => {
        logout(); // Call the logout function from your context
        setOpen(false); // Close the dropdown menu after logging out
    };

    if (pathname == "/login") return;

    return (
        <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center py-2 px-3 bg-[#8A2BE2]">

            <div>
                <img
                    alt="User avatar"
                    className="h-7 cursor-pointer"
                    src="/logo.png"
                />
            </div>
            <div className="flex items-center space-x-4">
                {/* <button className="p-2 rounded-full text-gray-500 hover:bg-gray-200">
                <span className="material-icons text-2xl">notifications</span>
              </button> */}
                <div className="relative inline-block">

                    <button
                        onClick={() => setOpen(!open)}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-[#a85bee] text-white hover:bg-opacity-80"
                    >
                        <span className="material-icons">person</span>
                    </button>


                    {/* Dropdown Menu */}
                    {open && (
                        <div className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg z-50 bg-white">
                            <ul className="py-2">
                                <li>
                                    <button className="w-full text-left px-4 py-2 text-sm text-gray-500 ">
                                        Profile
                                    </button>
                                </li>
                                <li>
                                    <button className="w-full text-left px-4 py-2 text-sm text-gray-500">
                                        Settings
                                    </button>
                                </li>
                                <li>
                                    <button onClick={() => handleLogout()} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-black-500">
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
