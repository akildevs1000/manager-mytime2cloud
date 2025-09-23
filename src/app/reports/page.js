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

import { getBranches, getEmployeeList } from "@/lib/api";
import { useEffect, useState } from "react";
import { useCompany } from "@/context/CompanyContext";

const employees = [
  {
    name: "Hanna Rony",
    empId: "2003",
    avatar:
      "https://randomuser.me/api/portraits/women/44.jpg",
    status: "Present",
    date: "23 Sep 23",
    day: "Friday",
    shift: "09:00 - 03:30",
    logs: [
      { in: "08:49", out: "13:22" },
      { in: "13:53", out: "17:59" },
    ],
    total: "08:39",
  },
  {
    name: "Remesh Ram",
    empId: "2000",
    avatar:
      "https://randomuser.me/api/portraits/men/32.jpg",
    status: "Absent",
    date: "23 Sep 23",
    day: "Friday",
    shift: "09:00 - 03:30",
    logs: [], // no logs for absent
    total: "00:00",
  },
  {
    name: "Sophia Khan",
    empId: "2005",
    avatar:
      "https://randomuser.me/api/portraits/women/68.jpg",
    status: "Late",
    date: "23 Sep 23",
    day: "Friday",
    shift: "09:00 - 03:30",
    logs: [
      { in: "09:45", out: "13:30" },
      { in: "14:00", out: "18:10" },
    ],
    total: "07:55",
  },
  {
    name: "Ali Haider",
    empId: "2007",
    avatar:
      "https://randomuser.me/api/portraits/men/11.jpg",
    status: "Half Day",
    date: "23 Sep 23",
    day: "Friday",
    shift: "09:00 - 03:30",
    logs: [{ in: "09:05", out: "13:00" }],
    total: "03:55",
  },
  {
    name: "Emma Watson",
    empId: "2008",
    avatar:
      "https://randomuser.me/api/portraits/women/12.jpg",
    status: "Present",
    date: "23 Sep 23",
    day: "Friday",
    shift: "09:00 - 03:30",
    logs: [
      { in: "08:58", out: "12:55" },
      { in: "13:40", out: "17:45" },
    ],
    total: "08:02",
  },
  {
    name: "David John",
    empId: "2010",
    avatar:
      "https://randomuser.me/api/portraits/men/41.jpg",
    status: "Present",
    date: "23 Sep 23",
    day: "Friday",
    shift: "09:00 - 03:30",
    logs: [
      { in: "08:40", out: "12:30" },
      { in: "13:10", out: "16:55" },
      { in: "17:05", out: "19:00" },
    ],
    total: "09:35",
  },
];

export default function AttendanceReports() {

  const { companyId } = useCompany();

  const [selectedBranch, setSelectedBranch] = useState(null);
  const [open, setOpen] = useState(false);
  const [branches, setBranches] = useState([]);

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


      <div className="my-3">
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

      {/* Reports */}
      <div className="mt-6 space-y-4">
        {employees.map((emp, index) => (
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
