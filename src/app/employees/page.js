"use client";

import { useCompany } from "@/context/CompanyContext";
import { getEmployees, getBranches } from "@/lib/api";
import { useEffect, useState } from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";

export default function Page() {

  const [branches, setBranches] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(null);

  const { companyId } = useCompany();
  const [employees, setEmployees] = useState([]);
  const [page, setPage] = useState(1);

  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = async (index) => {
    setOpenIndex(openIndex === index ? null : index);
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
  useEffect(() => {
    if (!companyId) return;

    const fetchLogs = async () => {
      try {
        const { data } = await getEmployees(companyId, page, selectedBranch); // use page here
        setEmployees(data);
      } catch (error) {
        console.error("Error fetching logs:", error);
      }
    };

    fetchLogs();
  }, [companyId, page, selectedBranch]); // fetch again when page changes

  // Always call hooks first, then conditionally render
  if (!companyId) {
    return <div className="text-center"></div>;
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
      <div id="employee-list">
        <div>
          {employees.map((e, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white dark:bg-card-dark rounded-lg mb-4 border border-gray-100 dark:border-gray-700 overflow-hidden transition"
              >
                {/* Header row */}
                <div
                  onClick={() => toggleAccordion(index, e.employee_id)}
                  className="flex items-center p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <img
                    alt={e?.first_name}
                    className="w-12 h-12 rounded-full mr-4 border"
                    src={
                      e?.profile_picture ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        e?.first_name == "---" ? "??" : e?.first_name
                      )}&background=8A2BE2&color=fff&size=120`
                    }
                  />
                  <div className="flex-1">
                    <h2 className="font-semibold text-gray-900 dark:text-text-dark">
                      {e.full_name}
                    </h2>
                    <p className="text-sm text-gray-500">{e?.designation?.name}</p>
                  </div>
                  <span
                    className={`material-icons text-gray-400 transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"
                      }`}
                  >
                    expand_more
                  </span>
                </div>

                {/* Expandable content */}
                <div
                  className={`transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? "max-h-96 p-4" : "max-h-0 p-0"
                    }`}
                >
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Emp Id</p>
                      <p className="font-medium text-gray-900">{e.employee_id}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Shift</p>
                      <p className="font-medium text-green-600">
                        {e?.schedule?.shift?.on_duty_time} - {e?.schedule?.shift?.off_duty_time}
                      </p>
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
                      <p className="text-gray-500">Phone</p>
                      <a
                        href={`tel:${e.phone_number}`}
                        className="font-medium text-blue-400 hover:underline"
                      >
                        {e.phone_number}
                      </a>
                    </div>
                    <div>
                      <p className="text-gray-500">WhatsApp</p>
                      <a
                        href={`https://wa.me/${e.whatsapp_number}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-blue-400 hover:underline"
                      >
                        {e.whatsapp_number}
                      </a>
                    </div>
                    <div>
                      <p className="text-gray-500">Email</p>
                      <a
                        href={`mailto:${e?.user?.email}`}
                        className="font-medium text-blue-400 hover:underline"
                      >
                        {e?.user?.email}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
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
