"use client";

import { createContext, useState, useEffect, useContext } from "react";

// 1. Create context
const CompanyContext = createContext();

// 2. Create provider
export function CompanyProvider({ children }) {
  const [companyId, setCompanyId] = useState(null);

  // Load companyId from localStorage on mount
  useEffect(() => {
    const storedCompanyId = localStorage.getItem("company_id");
    if (storedCompanyId) setCompanyId(storedCompanyId);
  }, []);

  // Save to localStorage whenever companyId changes
  useEffect(() => {
    if (companyId) localStorage.setItem("company_id", companyId);
  }, [companyId]);

  return (
    <CompanyContext.Provider value={{ companyId, setCompanyId }}>
      {children}
    </CompanyContext.Provider>
  );
}

// 3. Custom hook to use context easily
export function useCompany() {
  return useContext(CompanyContext);
}
