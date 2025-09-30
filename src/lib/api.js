import axios from "axios";

const API_BASE = "https://backend.mytime2cloud.com/api";

// companyId will be passed dynamically
export const getBranches = async (company_id = 0) => {
  const { data } = await axios.get(`${API_BASE}/branch-list`, {
    params: {
      order_by: "name",
      company_id: company_id,
    },
  });
  return data;
};

export const getAttendnaceCount = async (company_id = 0, branch_id = null) => {
  const { data } = await axios.get(`${API_BASE}/dashbaord_attendance_count`, {
    params: {
      company_id: company_id,
      branch_id: branch_id,
    },
  });
  return data;
};

// companyId will be passed dynamically
export const getLogs = async (company_id = 0, page = 1, count = 10, per_page = 10) => {
  const { data } = await axios.get(`${API_BASE}/device/getLastRecordsHistory/${company_id}/${count}?page=${page}`);
  return data;
};

// companyId will be passed dynamically
export const getTodayLogsCount = async (company_id = 0, branch_id = null, department_id = null) => {
  const { data } = await axios.get(`${API_BASE}/get_logs_count`, {
    params: {
      company_id: company_id,
      branch_id: branch_id,
      department_id: department_id,
    },
  });
  return data;
};

// companyId will be passed dynamically
export const getEmployees = async (company_id = 0, page = 1, per_page = 10) => {
  const { data } = await axios.get(`${API_BASE}/employeev1?company_id=${company_id}&per_page=${per_page}&page=${page}`);
  return data;
};


// companyId will be passed dynamically
export const getDepartments = async (company_id = 0, branch_id = 0) => {
  const { data } = await axios.get(`${API_BASE}/department-list?company_id=${company_id}&branch_id=${branch_id}`);
  return data;
};

// companyId will be passed dynamically
export const getEmployeeList = async (company_id = 0, branch_id = 0) => {
  const { data } = await axios.get(`${API_BASE}/scheduled_employees_with_type?company_id=${company_id}&branch_id=${branch_id}`);
  return data;
};

// companyId will be passed dynamically
export const getDeviceList = async (company_id = 0, branch_id = 0) => {
  const { data } = await axios.get(`${API_BASE}/device-list`, {
    params: {
      company_id: company_id,
      branch_id: branch_id,
    },
  });
  return data;
};

// companyId will be passed dynamically
export const openDoor = async (device_id = 0) => {
  const { data } = await axios.get(`${API_BASE}/open_door`, {
    params: {
      device_id: device_id,
    },
  });
  return data;
};

// companyId will be passed dynamically
export const closeDoor = async (device_id = 0) => {
  const { data } = await axios.get(`${API_BASE}/close_door`, {
    params: {
      device_id: device_id,
    },
  });
  return data;
};


// companyId will be passed dynamically
export const checkPin = async (company_id = 0, pin = "0000") => {
  const { data } = await axios.get(`${API_BASE}/check-pin`, {
    params: {
      company_id: company_id,
      pin: pin,
    },
  });
  return data;
};


// companyId will be passed dynamically
export const getAttendanceReports = async (payload = {}) => {
  const { data } = await axios.post(`${API_BASE}/attendance-report-new`, payload);
  return data;
};


export const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
})

// Attach token automatically (if available)
api.interceptors.request.use((config) => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})