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


import { getBranches, getAttendnaceCount, getLogs, getLastTenLogs } from "@/lib/api";
import { Suspense, useEffect, useState } from "react";
import StatsGrid from "@/components/StatsGrid";
import { useCompany } from "@/context/CompanyContext";
import { useAuth } from "@/context/AuthContext";

export default function Page() {

  const [isLogsLoading, setIsLogsLoading] = useState(false);

  const [branches, setBranches] = useState([]);
  const [stats, setStats] = useState({
    employeeCount: 0,
    presentCount: 0,
    absentCount: 0,
    leaveCount: 0,
    vaccationCount: 0,
  });
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [open, setOpen] = useState(false);
  const [logs, setLogs] = useState([]);
  const [childLogs, setChildLogs] = useState([]);
  const [page, setPage] = useState(1);

  const { companyId, setCompanyId } = useCompany();

  const { user, loading } = useAuth();
  const router = useRouter();

  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = async (index, UserID) => {

    setOpenIndex(openIndex === index ? null : index);

    let isOpenned = openIndex !== index;

    if (isOpenned && selectedIndex !== index) {
      setSelectedIndex(index);
      try {
        const data = await getLastTenLogs(companyId, UserID);
        console.log("🚀 ~ toggleAccordion ~ data:", data)
        setChildLogs(data)
      } catch (error) {
        console.error("Error fetching branches:", error);
      }
    }
  };


  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);


  // Fetch companyId from local storage with a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      const storedCompanyId = localStorage.getItem('company_id');
      console.log("🚀 ~ Page ~ storedCompanyId:", storedCompanyId)
      if (storedCompanyId && companyId != storedCompanyId) {
        setCompanyId(storedCompanyId);
      }
    }, 1000); // Wait for 3 seconds

    return () => clearTimeout(timer); // Cleanup function to prevent memory leaks
  }, []);



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

  const fetchLogs = async () => {
    if (!companyId) return;
    setIsLogsLoading(true); // Start loading
    try {
      const { data } = await getLogs(companyId, page);
      setLogs(data);
    } catch (error) {
      console.error("Error fetching logs:", error);
    } finally {
      setIsLogsLoading(false); // End loading
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [companyId, page, selectedBranch]);

  // Always call hooks first, then conditionally render

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null;
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
        <div className="flex items-center justify-between my-5">
          <h2 className="text-lg font-bold">Live Logs</h2>
          <button
            onClick={fetchLogs}
            disabled={isLogsLoading}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-card-hover-dark transition-colors duration-200"
          >
            {isLogsLoading ? (
              <span className="material-icons text-green-600 dark:text-gray-400 animate-spin">
                sync
              </span>
            ) : (
              <span className="material-icons text-green-600 dark:text-gray-400">
                refresh
              </span>
            )}
          </button>
        </div>
        <div className="space-y-3">
          {logs.map((log, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white dark:bg-card-dark rounded-xl shadow-md border border-gray-100 dark:border-gray-700 overflow-hidden transition"
              >
                {/* Header row */}
                <div
                  onClick={() => toggleAccordion(index, log?.UserID)}
                  className="flex items-center gap-4 p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  {/* Profile */}
                  <img
                    alt={log?.employee?.first_name}
                    className="h-12 w-12 rounded-full object-cover border"
                    src={
                      log?.employee?.profile_picture ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        log?.employee?.first_name == "---"
                          ? "??"
                          : log?.employee?.first_name
                      )}&background=8A2BE2&color=fff&size=120`
                    }
                  />

                  {/* Main info */}
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 dark:text-gray-100">
                      {log?.employee?.first_name}
                    </p>
                    <p className="text-sm text-gray-500">
                      Checked {log?.log_type?.name ?? log?.log_type ?? "---"}
                    </p>
                  </div>

                  {/* Time & arrow */}
                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      <p className="text-green-600 font-medium text-sm">{log.time}</p>
                      <p className="text-xs text-gray-500">{log.date}</p>
                    </div>
                    <span
                      className={`material-icons text-gray-400 transform transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"
                        }`}
                    >
                      expand_more
                    </span>
                  </div>
                </div>

                {/* Expandable content */}
                <div
                  className={`transition-all duration-500 ease-in-out ${isOpen ? "opacity-100 p-4" : "max-h-0 opacity-0 p-0"
                    } overflow-hidden text-sm text-gray-600 dark:text-gray-300 bg-white space-y-2`}
                >
                  {childLogs.map((log, index) => (
                    <div key={index} className="border-t dark:bg-card-dark rounded-lg p-4 mb-2 space-y-4">
                      <div className="flex justify-between items-center pt-2 border-border-light dark:border-border-dark">
                        <div className="text-sm">
                          <p className="text-gray-500">Date Time</p>
                          <p className="text-green-600 text-sm text-gray-500">{log.date} {log.time}</p>
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

              </div>
            );
          })}
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
          className="px-2 py-1 bg-[#8A2BE2] text-white rounded"
        >
          Next
        </button>
      </div>
    </>
  );
}
