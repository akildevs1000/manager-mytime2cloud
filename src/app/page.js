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

import { useRouter, useSearchParams } from "next/navigation";



import { getBranches, getAttendnaceCount, getLogs } from "@/lib/api";
import { Suspense, useEffect, useState } from "react";
import StatsGrid from "@/components/StatsGrid";
import { useCompany } from "@/context/CompanyContext";

export default function PageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Page />
    </Suspense>
  );
}

function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { companyId, setCompanyId } = useCompany();

  const [branches, setBranches] = useState([]);
  const [stats, setStats] = useState({
    employeeCount: 0,
    presentCount: 0,
    absentCount: 0,
    leaveCount: 0,
    vaccationCount: 0,
  });
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [open, setOpen] = useState(false);
  const [logs, setLogs] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const id = searchParams.get("company_id");
    if (id && id !== companyId) {
      setCompanyId(id);
    }
  }, [searchParams, companyId, setCompanyId]);

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

  // Fetch stats
  useEffect(() => {
    if (!companyId) return;
    const fetchStats = async () => {
      try {
        const data = await getAttendnaceCount(companyId, selectedBranch);
        setStats(data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };
    fetchStats();
  }, [companyId, selectedBranch]);

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

    fetchLogs();
  }, [companyId, page]); // fetch again when page changes

  // Always call hooks first, then conditionally render
  if (!companyId) {
    return <div className="text-center">Loading....</div>;
  }

  return (
    <>
      <div className="mb-5">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between py-5 text-gray-500 border-none"
            >
              {selectedBranch
                ? branches.find((b) => b.id === selectedBranch)?.name
                : "Select Branch"}

              {/* Arrow icon */}
              <span className="material-icons text-gray-400 ml-2">
                expand_more
              </span>
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-[320px] p-0">
            <Command>
              <CommandInput placeholder="Search branch..." />
              <CommandEmpty>No branch found.</CommandEmpty>
              <CommandGroup>
                <CommandItem
                  className="text-gray-500"
                  value="Select All"
                  onSelect={handleSelectBranch}
                >
                  Select All
                </CommandItem>
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

      <StatsGrid stats={stats} />


      <section>
        <h2 className="text-lg font-bold my-5">Live Logs</h2>
        <div className="space-y-3">
          {logs.map((log, index) => (
            <div key={index}
              className="flex items-center gap-4 p-3 bg-white dark:bg-card-dark rounded-lg"
            >
              <img
                alt="Liam Johnson"
                className="h-12 w-12 rounded-full object-cover"
                src={
                  log?.employee?.profile_picture ||
                  // 'https://lh3.googleusercontent.com/aida-public/AB6AXuBaC2gcwDY0mzgyIjjqALcls2KjjWNR8LPN5xvbr4zzNPRzaG9pDZy_iEdeYFYOeOISgsze_BRmzu1RtXTuL3efEqXU7nAfZPSU2LaAK9Ff9qPC42kTstmhp7QRfSBmauqlAUwSJKOfbHcF8QPXPHTM08pakvME7E-91XNPqxznhb60y7_58DhTJEooIqqs_mhq94B3T-PbbL_bQT5vQ9mYnziHXqf4WvG4stIWyrVO3G47Sed90Vs2vZa8BHjqIor97MS_3nhDzds'
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    log?.employee?.first_name == "---" ? "??" : log?.employee?.first_name
                  )}&background=4F46E5&color=fff&size=120`
                }
              />
              <div className="flex-1">
                <p className="font-semibold">{log?.employee?.first_name}</p>
                <p className="text-sm text-gray-500">
                  Checked {log.log_type == null ? "---" : log.log_type}
                </p>
              </div>
              <div className="text-right">
                <p className="font-medium text-sm">{log.time}</p>
                <p className="text-xs text-gray-500">
                  {log.date}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

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
          className="px-2 py-1 bg-indigo-600 text-white rounded"
        >
          Next
        </button>
      </div>
    </>
  );
}
