import axiosInstance from "../api/axiosConfig";

export const getAllCustomers = () => {
  return axiosInstance.get("/api/admin/customers");
};