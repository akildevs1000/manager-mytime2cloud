"use client";

import { useCompany } from "@/context/CompanyContext";
import { getLogs, getTodayLogsCount } from "@/lib/api";
import { useEffect, useState } from "react";

export default function LiveEmployeeLogs() {

    const { companyId } = useCompany();
    const [logs, setLogs] = useState([]);
    const [logsCount, setLogsCount] = useState(0);
    const [page, setPage] = useState(1);

    useEffect(() => {
        if (!companyId) return;

        const fetchLogs = async () => {
            try {
                const { data } = await getLogs(companyId, page); // use page here
                setLogs(data);
            } catch (error) {
                console.error("Error fetching logs:", error);
            }
        };

        const fetchLogsCount = async () => {
            try {
                setLogsCount(await getTodayLogsCount(companyId));
            } catch (error) {
                console.error("Error fetching logs:", error);
            }
        };

        fetchLogsCount();
        fetchLogs();
    }, [companyId, page]); // fetch again when page changes

    // Always call hooks first, then conditionally render
    if (!companyId) {
        return <div className="text-center">Unauthenticated</div>;
    }

    return (
        <>
            <div className="bg-white p-4 rounded-lg  flex justify-between items-center mt-0 mb-5">
                <p className="text-1xl font-medium text-gray-500">Total Logs</p>
                <p className="text-1xl font-bold text-indigo-600">{logsCount || 0}</p>
            </div>

            <div>
                {logs.map((log, index) => (
                    <div key={index} className="bg-white dark:bg-card-dark rounded-lg p-4 mb-2 space-y-4">
                        <div className="flex items-center space-x-3">
                            <img
                                alt={log?.employee?.full_name}
                                className="w-12 h-12 rounded-full object-cover"
                                src={
                                    log?.employee?.profile_picture ||
                                    // 'https://lh3.googleusercontent.com/aida-public/AB6AXuBaC2gcwDY0mzgyIjjqALcls2KjjWNR8LPN5xvbr4zzNPRzaG9pDZy_iEdeYFYOeOISgsze_BRmzu1RtXTuL3efEqXU7nAfZPSU2LaAK9Ff9qPC42kTstmhp7QRfSBmauqlAUwSJKOfbHcF8QPXPHTM08pakvME7E-91XNPqxznhb60y7_58DhTJEooIqqs_mhq94B3T-PbbL_bQT5vQ9mYnziHXqf4WvG4stIWyrVO3G47Sed90Vs2vZa8BHjqIor97MS_3nhDzds'
                                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                        log?.employee?.first_name == "---" ? "??" : log?.employee?.first_name
                                    )}&background=8A2BE2&color=fff&size=120`
                                }
                            />
                            <div>
                                <p className="font-semibold text-gray-900">{log?.employee?.first_name == "---" ? "Unkown" : log?.employee?.first_name}</p>
                                <p className="text-sm text-gray-500">{log.device?.location}</p>
                            </div>
                        </div>
                        <div className="flex justify-between items-center pt-2 border-t border-border-light dark:border-border-dark">
                            <div className="text-sm">
                                <p className="text-gray-500">Time</p>
                                <p className="text-green-600 text-sm text-gray-500">{log.log_date_time}</p>
                            </div>
                            <div className="text-sm text-center">
                                <p className="text-gray-500">In/Out</p>
                                <span className={log.log_type === "Out" ? "text-red-500 font-semibold" : "text-green-500 font-semibold"}>
                                    {log.log_type == null ? "---" : log.log_type}
                                </span>
                            </div>
                            <div className="text-sm text-right">
                                <p className="text-gray-500">Device</p>
                                <p className="text-sm text-gray-500">{log.device?.short_name}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-between mb-20 mt-5">
                <button
                    onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                    className="px-2 py-1 bg-gray-200 rounded disabled:opacity-50"
                >
                    Previous
                </button>

                <span className="px-2 py-1">Page {page}</span>

                <button
                    onClick={() => setPage(prev => prev + 1)}
                    className="px-2 py-1 bg-[#8A2BE2] text-white rounded"
                >
                    Next
                </button>
            </div>
        </>
    );
}
