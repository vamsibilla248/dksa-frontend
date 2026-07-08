import axiosInstance
    from "../api/axiosConfig";

export const uploadImage =
    (file) => {

        const formData =
            new FormData();

        formData.append(
            "file",
            file
        );

        return axiosInstance.post(
            "/api/images/upload",
            formData,
            {
                headers: {
                    "Content-Type":
                        "multipart/form-data",
                },
            }
        );
    };