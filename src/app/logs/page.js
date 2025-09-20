export default function LiveEmployeeLogs() {
    const logs = [
        {
            name: "PURATCHI PUYAL",
            location: "TANJORE",
            time: "2025-09-20 10:34:10",
            inOut: "In",
            device: "TNJ",
            avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCHnsYgJDedADWIi7lvShEkYifWEStphS1XGyUxQyicWNsw9pbmf0t5_xMVSFe8BhBfiO3HHZrJkmH2ayuz4k3GiyNEBIf2dia1nflPhJUM7b-O14if9j6__3JoUGy_2xcTHzcslA-SD2O7wYqMcg9Fm7Q3vmBODjYukeyjP2JNBpVSLEufKPDLItt9U-2iCp64PS9KQNgER39VU67lLKQpfhLnzyiDtMwZTqOFqGzufpzYD9kKBFvqqC42n9IM42ZEUoS-vjzGVXo"
        },
        {
            name: "PURATCHI PUYAL",
            location: "TANJORE",
            time: "2025-09-20 10:33:59",
            inOut: "Out",
            device: "TNJ",
            avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCz3c_UyWjuLjuuxT6vwELZYM2h8rLYsu5XzsyowN-Li_vzf_34pBfE4sMu9t7eq5o3gfkL1Vmw2ZcBtYut9NxM4yLoCoOTSSvFf1WB73VvUd3_VRrhIBm8a3xhqJpeAe48kgY_XgcrRhAl1f3lahoH6YT-HPC2BuYCVC1jsPWXz3pu-BZjM-ME9MtpXGgcwRIQMNemJe10MGkJOotmyQGtuysfUJB1TULVVy5HfMW1qknS7GoAebj92wZQ8RLgqB3P7XNkBEUvmRE"
        },
        {
            name: "SATHISH KUMAR.P",
            location: "TANJORE",
            time: "2025-09-20 09:51:52",
            inOut: "In",
            device: "TNJ",
            avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCMq-2mwIYlX8Mm0p3FTYT-9QKn-hZJ9ouuw6kZuuApAt0WR0vi4EIO47qJn7vixL9OdIeX4UQ4GjM0yguhpKdXKedAKUTh68tYDfgaFhOb8fAh9upFcTfMJ7Xk9gQj3ivaDTQb2aIdzHoYtdBh8yKWnfyEycWbHKOuW4DSi650AfdxasLbOIQDXhAH9Ft2e1ljUgcxbeISAtsiVLJi7TBnqfXDvhp-5A6kb3opVMhN9_jVnlq492sPCPQ3yZKe1WJfIR_OcE9fDcI"
        },
        {
            name: "Mohamed Ilyas",
            location: "TANJORE",
            time: "2025-09-20 09:39:30",
            inOut: "In",
            device: "TNJ",
            avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDfM4OuGhJzKjJ42ISsqexHTiQGHSIzGynFZbgxxe0Y36I9EJEZrGMXKv_ETbBeGUyACdP1hLl9Rmv-jsxuHqbJpoia27-fi7TXmEePnWjfJo-yE7l3hYZ9Q4QrBUl4Wg4rfbaVgpDPNinqE40qIhSiHK11dKUo-qpKwts0yHF0UzRa_9JU80jL_7BvlYk0TY1DWlERB3KH-JPk7p9U4LHwrIMVWI_tqewDUdpuGc8GzTEmpWNkZsF2IVdngY-zEFqAbneb_g_sd1k"
        },
        {
            name: "HAJA NAJMUDEEN",
            location: "TANJORE",
            time: "2025-09-20 09:38:16",
            inOut: "In",
            device: "TNJ",
            avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAYizoA4HN_jdjxSTpg0_CTESBuGZmYFl0DYcX2DEImuYwwB9i6ush0ip8qSfIKiBdiBIcJqDDcEiID2PrNjkLZwGzFA-JIyPBRVL6b1XUN-DQzRYgVTUj87tmHZNYWYuDrkT3LP3QKwzXKLkTbKRqJTogs8SESApFr9kEhZpYp3rzh7wEfBXmFY48zDBTrsJ15qX2vK9yRV0vVItrG3V-XTi1tCKFMreVa1nmXFb_8jT_nxUM5Fv4FyjAyi8pZIP416Fwy9s48rMI"
        }
    ];

    return (
        <>
            {/* Total Employees */}
            <div className="bg-white p-4 rounded-lg shadow-md mb-6 flex justify-between items-center">
                <p className="text-1xl font-medium text-gray-500">Total Logs</p>
                <p className="text-1xl font-bold text-indigo-600">137</p>
            </div>

            {logs.map((log, index) => (
                <div key={index} className="bg-card-light dark:bg-card-dark rounded-lg shadow p-4 space-y-4">
                    <div className="flex items-center space-x-3">
                        <img alt={log.name} className="w-12 h-12 rounded-full" src={log.avatar} />
                        <div>
                            <p className="font-semibold text-gray-900">{log.name}</p>
                            <p className="text-sm text-gray-500">{log.location}</p>
                        </div>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-border-light dark:border-border-dark">
                        <div className="text-sm">
                            <p className="text-gray-500">Time</p>
                            <p className="text-sm text-gray-500">{log.time}</p>
                        </div>
                        <div className="text-sm text-center">
                            <p className="text-gray-500">In/Out</p>
                            <span className={log.inOut === "In" ? "text-green-500 font-semibold" : "text-red-500 font-semibold"}>
                                {log.inOut}
                            </span>
                        </div>
                        <div className="text-sm text-right">
                            <p className="text-gray-500">Device</p>
                            <p className="text-sm text-gray-500">{log.device}</p>
                        </div>
                    </div>
                </div>
            ))}</>
    );
}
