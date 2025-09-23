// src/components/Dashboard.tsx
import React from 'react';

const Dashboard = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm">
        <div className="flex items-center justify-between p-4 border-b border-white/10 dark:border-black/10">
          <div className="w-8"></div>
          <h1 className="text-lg font-bold">Dashboard</h1>
          <button className="relative p-2 text-content-light dark:text-content-dark">
            <svg
              fill="currentColor"
              height="24"
              viewBox="0 0 256 256"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216ZM48,184c7.7-13.24,16-43.92,16-80a64,64,0,1,1,128,0c0,36.05,8.28,66.73,16,80Z"
              ></path>
            </svg>
            <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full"></span>
          </button>
        </div>
      </header>
      <main className="flex-1 p-4 space-y-6">
        <section className="grid grid-cols-2 gap-4">
          <div className="bg-card-light dark:bg-card-dark p-4 rounded-lg flex flex-col items-center justify-center text-center">
            <p className="text-sm font-medium text-subtle-light dark:text-subtle-dark">Present</p>
            <p className="text-3xl font-bold text-primary">120</p>
          </div>
          <div className="bg-card-light dark:bg-card-dark p-4 rounded-lg flex flex-col items-center justify-center text-center">
            <p className="text-sm font-medium text-subtle-light dark:text-subtle-dark">Absent</p>
            <p className="text-3xl font-bold">15</p>
          </div>
          <div className="bg-card-light dark:bg-card-dark p-4 rounded-lg flex flex-col items-center justify-center text-center">
            <p className="text-sm font-medium text-subtle-light dark:text-subtle-dark">On Leave</p>
            <p className="text-3xl font-bold">8</p>
          </div>
          <div className="bg-card-light dark:bg-card-dark p-4 rounded-lg flex flex-col items-center justify-center text-center">
            <p className="text-sm font-medium text-subtle-light dark:text-subtle-dark">Vacation</p>
            <p className="text-3xl font-bold">5</p>
          </div>
        </section>
        <section>
          <h2 className="text-lg font-bold mb-3">Live Logs</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-4 p-3 bg-card-light dark:bg-card-dark rounded-lg">
              <img
                alt="Liam Johnson"
                className="h-12 w-12 rounded-full object-cover"
                src="https://lh3.googleusercontent.com/a-/ALV-UjVw0b1V-h9w8hG4sA_e5-Yx-VpL0c3vOqjPjJgE5oG1wL4=s96-c"
              />
              <div className="flex-1">
                <p className="font-semibold">Liam Johnson</p>
                <p className="text-sm text-subtle-light dark:text-subtle-dark">Checked In</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-sm">09:02 AM</p>
                <p className="text-xs text-subtle-light dark:text-subtle-dark">2024-05-23</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-3 bg-card-light dark:bg-card-dark rounded-lg">
              <img
                alt="Olivia Williams"
                className="h-12 w-12 rounded-full object-cover"
                src="https://lh3.googleusercontent.com/a-/ALV-UjW-0G1Yk8f1_2j0r5q5x9b3n3jL3o9nZqJzR3eY2w4v5y6=s96-c"
              />
              <div className="flex-1">
                <p className="font-semibold">Olivia Williams</p>
                <p className="text-sm text-subtle-light dark:text-subtle-dark">Checked In</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-sm">09:01 AM</p>
                <p className="text-xs text-subtle-light dark:text-subtle-dark">2024-05-23</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-3 bg-card-light dark:bg-card-dark rounded-lg">
              <img
                alt="Noah Brown"
                className="h-12 w-12 rounded-full object-cover"
                src="https://lh3.googleusercontent.com/a-/ALV-UjXjL4m-4f5pZ9v8hJz-L0c5p-j3fK3m-sJ4gH3oP3jY_pA=s96-c"
              />
              <div className="flex-1">
                <p className="font-semibold">Noah Brown</p>
                <p className="text-sm text-subtle-light dark:text-subtle-dark">Checked In</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-sm">08:59 AM</p>
                <p className="text-xs text-subtle-light dark:text-subtle-dark">2024-05-23</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-3 bg-card-light dark:bg-card-dark rounded-lg">
              <img
                alt="Emma Jones"
                className="h-12 w-12 rounded-full object-cover"
                src="https://lh3.googleusercontent.com/a/ACg8ocJ8g-j_G-m_jL7vG_L_9qA_p-j_l_Lp-ZqKzQ_A=s96-c"
              />
              <div className="flex-1">
                <p className="font-semibold">Emma Jones</p>
                <p className="text-sm text-subtle-light dark:text-subtle-dark">Checked Out</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-sm">08:55 AM</p>
                <p className="text-xs text-subtle-light dark:text-subtle-dark">2024-05-23</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="sticky bottom-0 z-10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm">
        <div className="flex justify-around p-2 border-t border-white/10 dark:border-black/10">
          <a
            className="flex flex-col items-center justify-center gap-1 p-2 rounded-lg text-primary"
            href="#"
          >
            <svg
              className="text-primary"
              fill="currentColor"
              height="24"
              viewBox="0 0 256 256"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M224,115.55V208a16,16,0,0,1-16,16H168a16,16,0,0,1-16-16V168a8,8,0,0,0-8-8H112a8,8,0,0,0-8,8v40a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V115.55a16,16,0,0,1,5.17-11.78l80-75.48.11-.11a16,16,0,0,1,21.53,0,1.14,1.14,0,0,0,.11.11l80,75.48A16,16,0,0,1,224,115.55Z"
              ></path>
            </svg>
            <span className="text-xs font-bold">Dashboard</span>
          </a>
          <a
            className="flex flex-col items-center justify-center gap-1 p-2 rounded-lg text-subtle-light dark:text-subtle-dark"
            href="#"
          >
            <svg
              fill="currentColor"
              height="24"
              viewBox="0 0 256 256"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,48v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80H48V48ZM208,208H48V96H208V208Z"
              ></path>
            </svg>
            <span className="text-xs font-medium">Leave</span>
          </a>
          <a
            className="flex flex-col items-center justify-center gap-1 p-2 rounded-lg text-subtle-light dark:text-subtle-dark"
            href="#"
          >
            <svg
              fill="currentColor"
              height="24"
              viewBox="0 0 256 256"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M224,72H208V64a24,24,0,0,0-24-24H40A24,24,0,0,0,16,64v96a24,24,0,0,0,24,24H152v8a24,24,0,0,0,24,24h48a24,24,0,0,0,24-24V96A24,24,0,0,0,224,72ZM40,168a8,8,0,0,1-8-8V64a8,8,0,0,1,8-8H184a8,8,0,0,1,8,8v8H176a24,24,0,0,0-24,24v72Zm192,24a8,8,0,0,1-8,8H176a8,8,0,0,1-8-8V96a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8Zm-96,16a8,8,0,0,1-8,8H88a8,8,0,0,1,0-16h40A8,8,0,0,1,136,208Zm80-96a8,8,0,0,1-8,8H192a8,8,0,0,1,0-16h16A8,8,0,0,1,216,112Z"
              ></path>
            </svg>
            <span className="text-xs font-medium">Devices</span>
          </a>
          <a
            className="flex flex-col items-center justify-center gap-1 p-2 rounded-lg text-subtle-light dark:text-subtle-dark"
            href="#"
          >
            <svg
              fill="currentColor"
              height="24"
              viewBox="0 0 256 256"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"
              ></path>
            </svg>
            <span className="text-xs font-medium">Profile</span>
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;