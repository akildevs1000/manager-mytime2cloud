"use client";

import { useCompany } from "@/context/CompanyContext";
import { getEmployees } from "@/lib/api";
import { useEffect, useState } from "react";

export default function Page() {


  const { companyId } = useCompany();
  const [employees, setEmployees] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!companyId) return;

    const fetchLogs = async () => {
      try {
        const { data } = await getEmployees(companyId, page); // use page here
        setEmployees(data);
      } catch (error) {
        console.error("Error fetching logs:", error);
      }
    };

    fetchLogs();
  }, [companyId, page]); // fetch again when page changes

  // Always call hooks first, then conditionally render
  if (!companyId) {
    return <div className="text-center">Unauthenticated</div>;
  }

  return (
    <>
      <div id="employee-list">
        <div>
          {employees.map((e, index) => (
            <div key={index} className="bg-white dark:bg-card-dark rounded-lg p-4 mb-4">
              <div className="flex items-center">
                <img alt="Abdrahman Kassim avatar" className="w-12 h-12 rounded-full mr-4"
                  src={
                    e?.profile_picture ||
                    // 'https://lh3.googleusercontent.com/aida-public/AB6AXuBaC2gcwDY0mzgyIjjqALcls2KjjWNR8LPN5xvbr4zzNPRzaG9pDZy_iEdeYFYOeOISgsze_BRmzu1RtXTuL3efEqXU7nAfZPSU2LaAK9Ff9qPC42kTstmhp7QRfSBmauqlAUwSJKOfbHcF8QPXPHTM08pakvME7E-91XNPqxznhb60y7_58DhTJEooIqqs_mhq94B3T-PbbL_bQT5vQ9mYnziHXqf4WvG4stIWyrVO3G47Sed90Vs2vZa8BHjqIor97MS_3nhDzds'
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      e?.first_name == "---" ? "??" : e?.first_name
                    )}&background=8A2BE2&color=fff&size=120`
                  }
                />
                <div className="flex-1">
                  <h2 className="font-semibold text-gray-900 dark:text-text-dark">{e.full_name}</h2>
                  <p className="text-sm text-gray-500">{e?.designation?.name}</p>
                </div>
                <button className="text-gray-500">
                  {/* <span className="material-icons">more_vert</span> */}
                </button>
              </div>
              <div className="mt-4 border-t border-border-light dark:border-border-dark pt-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Emp Id</p>
                    <p className="font-medium text-gray-900">{e.employee_id}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Branch</p>
                    <p className="font-medium text-gray-900">{e?.branch?.branch_name}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Department</p>
                    <p className="font-medium text-gray-900">{e?.department?.name}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Shift</p>
                    <p className="font-medium text-green-600">{e?.schedule?.shift?.on_duty_time} - {e?.schedule?.shift?.off_duty_time}</p>
                  </div>
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
      </div>
    </>
  );
}
