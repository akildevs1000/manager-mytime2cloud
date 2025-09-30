"use client";

import { createContext, useState, useContext } from "react";

// 1. Create context
const StatusContext = createContext();

// 2. Create provider
export function StatusProvider({ children }) {
  const [statusId, setStatusId] = useState(null);

  return (
    <StatusContext.Provider value={{ statusId, setStatusId }}>
      {children}
    </StatusContext.Provider>
  );
}

// 3. Custom hook to use context easily
export function useStatus() {
  return useContext(StatusContext);
}
