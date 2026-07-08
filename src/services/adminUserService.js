import axiosInstance
    from "../api/axiosConfig";

export const getAllUsers =
    () => {

        return axiosInstance.get(
            "/api/admin/users"
        );
    };

export const toggleUser =
    (id, active) => {

        return axiosInstance.put(
            `/api/admin/users/${id}/toggle?active=${active}`
        );
    };