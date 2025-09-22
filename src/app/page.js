"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Page() {
  return (
    <>
      {/* Branch Selector */}
      <div className="mb-5">
        <Select >
          <SelectTrigger className="w-full py-5">
            <SelectValue placeholder="Select Branch" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Branches</SelectItem>
            <SelectItem value="a">Branch A</SelectItem>
            <SelectItem value="b">Branch B</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* Today Presents */}
        <div className="bg-white p-2 rounded-lg shadow-md flex flex-col items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
            <span className="material-icons text-green-500">person</span>
          </div>
          <p className="text-1xl font-bold text-green-500">250</p>
          <p className="text-sm text-gray-500 mt-1">Today Presents</p>
        </div>

        {/* Today Absents */}
        <div className="bg-white p-2 rounded-lg shadow-md flex flex-col items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
            <span className="material-icons text-red-500">person_off</span>
          </div>
          <p className="text-1xl font-bold text-red-500">251</p>
          <p className="text-sm text-gray-500 mt-1">Today Absents</p>
        </div>

        {/* On Vacation */}
        <div className="bg-white p-2 rounded-lg shadow-md flex flex-col items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
            <span className="material-icons text-blue-500">flight</span>
          </div>
          <p className="text-1xl font-bold text-blue-500">0</p>
          <p className="text-sm text-gray-500 mt-1">On Vacation</p>
        </div>

        {/* On Leave */}
        <div className="bg-white p-2 rounded-lg shadow-md flex flex-col items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center mb-4">
            <span className="material-icons text-yellow-500">timer</span>
          </div>
          <p className="text-1xl font-bold text-yellow-500">0</p>
          <p className="text-sm text-gray-500 mt-1">On Leave</p>
        </div>

        {/* Offline Devices */}
        <div className="bg-white p-2 rounded-lg shadow-md flex flex-col items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mb-4">
            <span className="material-icons text-orange-500">devices_other</span>
          </div>
          <p className="text-1xl font-bold text-orange-500">7</p>
          <p className="text-sm text-gray-500 mt-1">Offline Devices</p>
        </div>

        {/* Leave Requests */}
        <div className="bg-white p-2 rounded-lg shadow-md flex flex-col items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mb-4">
            <span className="material-icons text-gray-500">badge</span>
          </div>
          <p className="text-1xl font-bold text-gray-500">0</p>
          <p className="text-sm text-gray-500 mt-1">Leave Requests</p>
        </div>
      </div>
    </>
  );
}
