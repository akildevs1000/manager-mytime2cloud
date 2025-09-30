"use client";


import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"


import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

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

import { useRouter } from "next/navigation";


import { getBranches, getDeviceList, openDoor, closeDoor } from "@/lib/api";
import { useEffect, useState } from "react";
import { useCompany } from "@/context/CompanyContext";
import { useAuth } from "@/context/AuthContext";


import doorAnimation from "../../../public/animations/door-open.json";
import Lottie from "lottie-react";
export default function Page() {

  const [animationData, setAnimationData] = useState(null);

  const [shake, setShake] = useState(false);

  const [isLogsLoading, setIsLogsLoading] = useState(false);

  const { companyId, setCompanyId } = useCompany();


  const [otp, setOtp] = useState("");
  const [showOtpBox, setShowOtpBox] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);

  const { user, loading } = useAuth();
  const router = useRouter();


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

  const [branches, setBranches] = useState([]);

  const [selectedBranch, setSelectedBranch] = useState(null);
  const [open, setOpen] = useState(false);
  const [devices, setDevices] = useState([]);

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
      setDevices(await getDeviceList(companyId, selectedBranch));
    } catch (error) {
      console.error("Error fetching devices:", error);
    } finally {
      setIsLogsLoading(false); // End loading
    }
  };

  const handleOpenDoorCommand = async (device_id, isActive) => {
    if (!isActive) return;
    setSelectedDevice(device_id);
    setShowOtpBox(true);
  }

  const handleOtpSubmit = async () => {
    if (otp === "0000") {
      try {
        let res = await openDoor(selectedDevice);
        console.log("🚀 ~ handleOtpSubmit ~ res:", res)

        setAnimationData(true);

        setTimeout(() => {
          setShowOtpBox(false);
          setAnimationData(false);
          setSelectedDevice(null);
          setOtp("");
        }, 5000); // hide animation

      } catch (err) {
        console.log(err);
      }
    } else {
      // restart shake animation without touching dialog state
      setShake(false);
      requestAnimationFrame(() => setShake(true));
      setOtp(""); // optional: clear invalid OTP
    }
  };

  const handleCloseDoorCommand = async (device_id, isActive) => {
    if (!isActive) return;
    await closeDoor(device_id);
  }

  useEffect(() => {
    fetchLogs();
  }, [companyId, selectedBranch]);

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

      <section className="mb-20">
        <div className="flex items-center justify-between my-5">
          <h2 className="text-lg font-bold">Devices</h2>
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
          {devices.map((device, index) => {
            const isActive = device.status_id !== 2; // Active if status_id is not 2
            return (
              <div
                key={index}
                className={`flex items-center justify-between gap-4 p-3 bg-white dark:bg-card-dark rounded-lg border-l-4 ${isActive ? "border-green-500" : "border-red-500"
                  }`}
              >
                <div className="flex-1">
                  <p className="font-semibold">{device?.short_name}</p>
                  <p className="text-sm text-gray-500">
                    {device.location}
                  </p>
                </div>
                <div className="flex gap-2">
                  {/* Open Door Icon */}
                  <button onClick={() => handleOpenDoorCommand(device.device_id, isActive)} className="h-10 w-10 pt-1 rounded-full bg-green-100 hover:bg-green-200">
                    <span className="material-icons text-green-600">lock_open</span>
                  </button>
                  {/* Close Door Icon */}
                  <button onClick={() => handleCloseDoorCommand(device.device_id, isActive)} className="h-10 w-10 pt-1 rounded-full bg-red-100 hover:bg-red-200">
                    <span className="material-icons text-red-600">lock</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </section>
      <Dialog open={showOtpBox} onOpenChange={setShowOtpBox}>
        {!animationData ? (
          <DialogContent className={`sm:max-w-[400px] backdrop-blur-md transition-all`}>

            <DialogHeader>
              <DialogTitle className="text-lg text-gray-600 font-bold">Open the Door</DialogTitle>
              <DialogDescription className="text-sm text-gray-500">
                Please enter the 4-digit pin to open the door.
              </DialogDescription>
            </DialogHeader>

            <div className={`py-4 flex justify-center ${shake ? "animate-shake" : ""}`}>

              <InputOTP maxLength={4} value={otp} onChange={setOtp}>
                <InputOTPGroup className="flex gap-4">
                  {[0, 1, 2, 3].map((i) => (
                    <InputOTPSlot
                      key={i}
                      index={i}
                      className="h-14 w-14 !rounded-full !border-2 border-gray-300 text-2xl font-mono flex items-center justify-center focus:!border-green-500 focus:!ring-2 focus:!ring-green-200 transition-all"
                    />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            </div>
            <DialogFooter className="flex justify-end gap-2">
              <Button
                onClick={handleOtpSubmit}
                className="bg-[#8A2BE2] text-white"
              >
                Submit
              </Button>
            </DialogFooter>
          </DialogContent>
        ) :
          <DialogContent className={`sm:max-w-[400px] backdrop-blur-md transition-all`}>
            <DialogHeader>
              <DialogTitle className="text-lg text-gray-600 font-bold">Door Open</DialogTitle>
              <DialogDescription className="text-sm text-gray-500">
                Your door is openning
              </DialogDescription>
            </DialogHeader>

            {animationData && (
              <div className={`flex justify-center`}>
                <Lottie animationData={doorAnimation} loop={false} className="w-48 h-48" />
              </div>
            )}
          </DialogContent>
        }
      </Dialog>
    </>
  );
}
