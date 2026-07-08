// src/services/reportService.js

import axiosInstance from "../api/axiosConfig";

export const getReports = () => {
    return axiosInstance.get(
        "/api/admin/reports"
    );
};


export const getMonthlyReports =
    () => {

        return axiosInstance.get(
            "/api/admin/reports/monthly"
        );
    };