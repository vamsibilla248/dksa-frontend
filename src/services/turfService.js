import axiosInstance
    from "../api/axiosConfig";

export const getActiveTurfs =
    () => {

        return axiosInstance.get(
            "/api/customer/turfs"
        );
    };

export const getAdminActiveTurfs =
    () => {

        return axiosInstance.get(
            "/api/admin/turfs"
        );
    };

export const createTurf = (data) => {

    return axiosInstance.post(
        "/api/admin/turfs",
        data
    );
};