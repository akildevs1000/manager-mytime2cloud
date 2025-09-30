"use client";
import { useStatus } from "@/context/StatusContext";
import { useRouter } from "next/navigation";

export default function StatsGrid({ stats }) {

    const { setStatusId } = useStatus();

    const router = useRouter();

    const handleClick = (id) => {
        setStatusId(id);
        console.log("Clicked Status ID:", id);
        router.push("/reports")
    };


    return (
        <div className="grid grid-cols-2 gap-4">
            {/* Today Presents */}
            <div onClick={() => handleClick("P")} className="bg-white p-5 rounded-lg  flex flex-col items-center justify-center">
                {/* <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                    <span className="material-icons text-green-500">person</span>
                </div> */}
                <p className="text-sm text-gray-500 mt-1">Today Presents</p>
                <p className="text-2xl font-bold text-green-500">{stats?.presentCount}</p>
            </div>

            {/* Today Absents */}
            <div onClick={() => handleClick("A")} className="bg-white p-5 rounded-lg  flex flex-col items-center justify-center">
                {/* <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
                    <span className="material-icons text-red-500">person_off</span>
                </div> */}
                <p className="text-sm text-gray-500 mt-1">Today Absents</p>
                <p className="text-2xl font-bold text-red-500">{stats?.absentCount}</p>
            </div>

            {/* On Vacation */}
            <div onClick={() => handleClick("V")} className="bg-white p-5 rounded-lg  flex flex-col items-center justify-center">
                {/* <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                    <span className="material-icons text-blue-500">flight</span>
                </div> */}
                <p className="text-sm text-gray-500 mt-1">On Vacation</p>
                <p className="text-2xl font-bold text-blue-500">{stats?.vaccationCount}</p>
            </div>

            {/* On Leave */}
            <div onClick={() => handleClick("L")} className="bg-white p-5 rounded-lg  flex flex-col items-center justify-center">
                {/* <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center mb-4">
                    <span className="material-icons text-yellow-500">timer</span>
                </div> */}
                <p className="text-sm text-gray-500 mt-1">On Leave</p>
                <p className="text-2xl font-bold text-yellow-500">{stats?.leaveCount}</p>
            </div>

            {/* Offline Devices */}
            <div className="bg-white p-5 rounded-lg  flex flex-col items-center justify-center">
                {/* <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mb-4">
                    <span className="material-icons text-orange-500">devices_other</span>
                </div> */}
                <p className="text-sm text-gray-500 mt-1">Offline Devices</p>
                <p className="text-2xl font-bold text-orange-500">{stats?.offlineDevices}</p>
            </div>

            {/* Leave Requests */}
            <div className="bg-white p-5 rounded-lg  flex flex-col items-center justify-center">
                {/* <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                    <span className="material-icons text-gray-500">badge</span>
                </div> */}
                <p className="text-sm text-gray-500 mt-1">Inside</p>
                <p className="text-2xl font-bold text-gray-500">{stats?.additional?.inside}</p>
            </div>
        </div>
    );
}
