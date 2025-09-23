"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

import { getBranches, getEmployeeList } from "@/lib/api";
import { useEffect, useState } from "react";
import { useCompany } from "@/context/CompanyContext";

import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";


export default function AttendanceReports() {

  const attendances = [];

  const { companyId } = useCompany();

  const [selectedBranch, setSelectedBranch] = useState(null);
  const [open, setOpen] = useState(false);
  const [branches, setBranches] = useState([]);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [fromDatePopoverOpen, setFromDatePopoverOpen] = useState(false); // New state for From Date popover
  const [toDatePopoverOpen, setToDatePopoverOpen] = useState(false); // New state for To Date popover

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
    Present: { bg: "#DCFCE7", color: "#166534" },
    Absent: { bg: "#FEE2E2", color: "#991B1B" },
    Late: { bg: "#FEF9C3", color: "#92400E" },
    "Half Day": { bg: "#E0F2FE", color: "#075985" },
  };

  const handleSelectBranch = (currentValue) => {
    if (currentValue === "Select All") {
      setSelectedBranch(null);
    } else {
      const selectedBranchItem = branches.find((b) => b.name === currentValue);
      if (selectedBranchItem) {
        setSelectedBranch(
          selectedBranchItem.id === selectedBranch ? null : selectedBranchItem.id
        );
      }
    }
    setOpen(false);
  };

  // Always call hooks first, then conditionally render
  if (!companyId) {
    return <div className="text-center">Unauthenticated</div>;
  }

  return (
    <div className="mb-4">
      <h2 className="text-2xl font-bold">Attendance Reports</h2>

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

        {/* From Date Picker */}
        <div className="w-full md:w-1/3">
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
                  setFromDatePopoverOpen(false); // Close popover
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* To Date Picker */}
        <div className="w-full md:w-1/3">
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
                  setToDatePopoverOpen(false); // Close popover
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Reports */}
      <div className="mt-6 space-y-4">
        {attendances.map((emp, index) => (
          <div
            key={index}
            className="bg-card-light dark:bg-card-dark p-4 rounded-lg shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <img
                  className="h-10 w-10 rounded-full mr-3"
                  src={emp.avatar}
                  alt={`${emp.name} avatar`}
                />
                <div>
                  <p className="font-semibold">{emp.name}</p>
                  <p className="text-sm text-gray-500">{emp.empId}</p>
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
                  {emp.status}
                </span>
                <button className="text-gray-500">
                  <span className="material-icons">more_vert</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium text-gray-500">Date</p>
                <p>
                  {emp.date}{" "}
                  <span className="text-xs text-gray-500">{emp.day}</span>
                </p>
              </div>
              <div>
                <p className="font-medium text-gray-500">Shift</p>
                <p>{emp.shift}</p>
              </div>

              {emp.logs.length > 0 ? (
                emp.logs.map((punch, idx) => (
                  <div key={idx} className="col-span-2 grid grid-cols-2 gap-4">
                    <div>
                      <p className="font-medium text-gray-500">In {idx + 1}</p>
                      <p>{punch.in}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-500">Out {idx + 1}</p>
                      <p>{punch.out}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-2 text-gray-400 italic">
                  No logs recorded
                </div>
              )}

              <div>
                <p className="font-medium text-gray-500">Total Hrs</p>
                <p>{emp.total}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}