import axiosInstance from "../api/axiosConfig";

export const createOrder = (amount) => {

    return axiosInstance.post(
        "/api/payment/create-order",
        {
            amount,
        }
    );
};

export const verifyPayment = (data) => {

    return axiosInstance.post(
        "/api/payment/verify",
        data
    );
};