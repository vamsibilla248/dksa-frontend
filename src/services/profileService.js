import axiosInstance
    from "../api/axiosConfig";

export const getProfile =
    () => {

        return axiosInstance.get(
            "/api/customer/profile"
        );
    };

export const updateProfile =
    (data) => {

        return axiosInstance.put(
            "/api/customer/profile",
            data
        );
    };


export const changePassword =
    (data) => {

        return axiosInstance.put(
            "/api/customer/profile/change-password",
            data
        );
    };