"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Footer() {
    const pathname = usePathname();

    const isActive = (href) => pathname === href;

    if(pathname == "/login") return;

    return (
        <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around p-2">
            <Link
                href="/"
                className={`flex flex-col items-center ${isActive("/") ? "text-indigo-600" : "text-gray-500"
                    }`}
            >
                <span className="material-icons">home</span>
                <span className="text-xs">Home</span>
            </Link>

            <Link
                href="/logs"
                className={`flex flex-col items-center ${isActive("/logs") ? "text-indigo-600" : "text-gray-500"
                    }`}
            >
                <span className="material-icons">schedule</span> {/* more relevant icon */}
                <span className="text-xs">Live Logs</span>
            </Link>

            <Link
                href="/reports"
                className={`flex flex-col items-center ${isActive("/reports") ? "text-indigo-600" : "text-gray-500"
                    }`}
            >
                <span className="material-icons">bar_chart</span>
                <span className="text-xs">Reports</span>
            </Link>

            <Link
                href="/employees"
                className={`flex flex-col items-center ${isActive("/employees") ? "text-indigo-600" : "text-gray-500"
                    }`}
            >
                <span className="material-icons">people</span>
                <span className="text-xs">Employees</span>
            </Link>
        </footer>
    );
}
