"use client";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

// You'll need to create this API function to fetch attendance
import { getAttendanceReports, getBranches } from "@/lib/api";
import { useEffect, useState } from "react";
import { useCompany } from "@/context/CompanyContext";

import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Loader2 } from "lucide-react";

export default function AttendanceReports() {
  const { companyId } = useCompany();

  const [selectedBranch, setSelectedBranch] = useState(null);
  const [open, setOpen] = useState(false);
  const [branches, setBranches] = useState([]);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [fromDatePopoverOpen, setFromDatePopoverOpen] = useState(false);
  const [toDatePopoverOpen, setToDatePopoverOpen] = useState(false);
  const [employeeAttendance, setEmployeeAttendance] = useState([]); // State to hold attendance data
  const [isLoading, setIsLoading] = useState(false); // State for loading status

  // Fetch branches
  useEffect(() => {
    if (!companyId) return;
    const fetchBranches = async () => {
      try {
        const data = await getBranches(companyId);
        setBranches(data);
      } catch (error) {
        console.error("Error fetching branches:", error);
      }
    };
    fetchBranches();
  }, [companyId]);

  // status colors
  const statusStyles = {
    P: { bg: "#DCFCE7", color: "#166534", name: "Present" },
    A: { bg: "#FEE2E2", color: "#991B1B", name: "Absent" },
    L: { bg: "#FEF9C3", color: "#92400E", name: "Late" },


    O: { bg: "#E5E7EB", color: "#374151", name: "Week Off" },
    M: { bg: "#f8e194ff", color: "#92400E", name: "Incomplete" },
    EG: { bg: "#D1FAE5", color: "#065F46", name: "Early Going" },
    LC: { bg: "#FEF3C7", color: "#92400E", name: "Late Coming" },
    "Half Day": { bg: "#E0F2FE", color: "#075985", name: "Half Day" },
  };

  const handleSelectBranch = (currentValue) => {
    const selectedBranchItem = branches.find((b) => b.name.toLowerCase() === currentValue.toLowerCase());
    setSelectedBranch(selectedBranchItem ? selectedBranchItem.id : null);
    setOpen(false);
  };

  const handleGenerateReport = async () => {
    setIsLoading(true);
    try {
      let payload = {
        "page": 1,
        "per_page": 10,
        "company_id": companyId,
        "report_type": "Monthly",
        "shift_type_id": 0,
        "report_template": "Template1",
        "overtime": 0,
        "from_date": fromDate ? format(fromDate, 'yyyy-MM-dd') : null,
        "to_date": toDate ? format(toDate, 'yyyy-MM-dd') : null,
        // "employee_id": [
        //   "50",
        //   "48",
        //   "3003",
        //   "3006",
        //   "3005",
        //   "3004",
        //   "3009",
        //   "45",
        //   "3002",
        //   "46",
        //   "3001"
        // ],
        // "department_ids": [
        //   65,
        //   66,
        //   70,
        //   69,
        //   72,
        //   68
        // ],
        // "statuses": [],
        "branch_id": selectedBranch,
        // "daily_date": "2025-09-23",
        "showTabs": "{\"single\":true,\"dual\":false,\"multi\":false}",
        // "tabselected": {
        //   "isTrusted": true
        // },
        "filterType": "Monthly",
        // "key": 1
      }

      //   // API call to fetch attendance data with filters
      const data = await getAttendanceReports(payload);
      console.log("🚀 ~ handleGenerateReport ~ data:", data)

      setEmployeeAttendance(data.data);
    } catch (error) {
      console.error("Error fetching attendance reports:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!companyId) {
    return <div className="text-center">Unauthenticated</div>;
  }

  return (
    <div className="mb-4  p-4">
      {/* <h2 className="text-2xl font-bold">Attendance Reports</h2> */}
      <div className="my-3 flex flex-col md:flex-row gap-3">
        {/* Branch Popover */}
        <div className="w-full md:w-1/3">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full justify-between py-5 text-gray-500"
              >
                {selectedBranch
                  ? branches.find((b) => b.id === selectedBranch)?.name
                  : "Select Branch"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[320px] p-0">
              <Command>
                <CommandInput placeholder="Search branch..." />
                <CommandEmpty>No branch found.</CommandEmpty>
                <CommandGroup>
                  {branches.map((branch) => (
                    <CommandItem
                      className="text-gray-500"
                      key={branch.id}
                      value={branch.name}
                      onSelect={handleSelectBranch}
                    >
                      {branch.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        {/* Date Pickers on one line */}
        <div className="w-full md:w-2/3 flex flex-col md:flex-row gap-3">
          {/* From Date Picker */}
          <Popover open={fromDatePopoverOpen} onOpenChange={setFromDatePopoverOpen}>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal py-5 text-gray-500",
                  !fromDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {fromDate ? format(fromDate, "LLL dd, y") : <span>From Date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={fromDate}
                onSelect={(date) => {
                  setFromDate(date);
                  setFromDatePopoverOpen(false);
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          {/* To Date Picker */}
          <Popover open={toDatePopoverOpen} onOpenChange={setToDatePopoverOpen}>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal py-5 text-gray-500",
                  !toDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {toDate ? format(toDate, "LLL dd, y") : <span>To Date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={toDate}
                onSelect={(date) => {
                  setToDate(date);
                  setToDatePopoverOpen(false);
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Submit Button */}
      <div className="w-full mt-3">
        <Button
          className="w-full py-5"
          onClick={handleGenerateReport}
          disabled={isLoading}
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Generate Report
        </Button>
      </div>

      {/* Reports */}
      <div className="mt-6 space-y-4">
        {isLoading ? (
          <div className="flex justify-center items-center h-48">
            <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
            <span className="ml-2 text-gray-500">Loading reports...</span>
          </div>
        ) : (
          employeeAttendance.length > 0 ? (
            employeeAttendance.map((emp, index) => (
              <div
                key={index}
                className="bg-card-light dark:bg-card-dark p-4 rounded-lg shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <img
                      className="h-10 w-10 rounded-full mr-3"
                      src={
                        emp?.employee?.profile_picture ||
                        // 'https://lh3.googleusercontent.com/aida-public/AB6AXuBaC2gcwDY0mzgyIjjqALcls2KjjWNR8LPN5xvbr4zzNPRzaG9pDZy_iEdeYFYOeOISgsze_BRmzu1RtXTuL3efEqXU7nAfZPSU2LaAK9Ff9qPC42kTstmhp7QRfSBmauqlAUwSJKOfbHcF8QPXPHTM08pakvME7E-91XNPqxznhb60y7_58DhTJEooIqqs_mhq94B3T-PbbL_bQT5vQ9mYnziHXqf4WvG4stIWyrVO3G47Sed90Vs2vZa8BHjqIor97MS_3nhDzds'
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          emp?.employee?.first_name == "---" ? "??" : emp?.employee?.first_name
                        )}&background=4F46E5&color=fff&size=120`
                      }
                      alt={`${emp?.employee?.first_name} avatar`}
                    />
                    <div>
                      <p className="font-semibold">{emp?.employee?.first_name}</p>
                      <p className="text-sm text-gray-500">{emp?.employee?.employee_id}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                      style={{
                        backgroundColor: statusStyles[emp.status]?.bg,
                        color: statusStyles[emp.status]?.color,
                      }}
                    >
                      {statusStyles[emp.status]?.name}
                    </span>
                    <button className="text-gray-500">
                      <span className="material-icons">more_vert</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-gray-500">Date</p>
                    <p className="text-gray-500">
                      {emp.date}{" "}
                      <span className="text-xs">{emp.day}</span>
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-500">Shift</p>
                    <p className="text-gray-500">{emp.shift?.name} {emp.shift_type_id}</p>
                  </div>

                  {
                    emp.shift_type_id == 2
                      ?
                      <>
                        {emp.logs?.length > 0 ? (
                          emp.logs.map((punch, idx) => (
                            <div key={idx} className="col-span-2 grid grid-cols-2 gap-4">
                              <div>
                                <p className="font-medium text-gray-500">In {idx + 1}</p>
                                <p className="text-green-600">{punch.in}</p>
                              </div>
                              <div>
                                <p className="font-medium text-gray-500">Out {idx + 1}</p>
                                <p className="text-green-600">{punch.out}</p>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="col-span-2 text-gray-400 italic">
                            No logs recorded
                          </div>
                        )}</>
                      : <div className="col-span-2 grid grid-cols-2 gap-4">
                        <div>
                          <p className="font-medium text-gray-500">In</p>
                          <p className="text-green-600">{emp.in}</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-500">Out</p>
                          <p className="text-green-600">{emp.out}</p>
                        </div>
                      </div>
                  }

                  <div>
                    <p className="font-medium text-gray-500">Total Hrs</p>
                    <p className="text-green-600">{emp.total_hrs}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 mt-10">
              No attendance reports found. Please select a branch and date range.
            </div>
          )
        )}
      </div>
    </div>
  );
}