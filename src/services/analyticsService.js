import axiosInstance
    from "../api/axiosConfig";

export const getAnalytics =
    () => {

        return axiosInstance.get(
            "/api/admin/analytics"
        );
    };