import axiosInstance
    from "../api/axiosConfig";

export const addTurfImage =
    (
        turfId,
        imageUrl
    ) => {

        return axiosInstance.post(
            `/api/admin/turf-images/${turfId}`,
            null,
            {
                params: {
                    imageUrl
                }
            }
        );
    };