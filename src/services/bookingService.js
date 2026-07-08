// src/services/bookingService.js

import axiosInstance
    from "../api/axiosConfig";

export const getMyBookings =
    () => {

        return axiosInstance.get(
            "/api/customer/bookings/my"
        );
    };

export const getReceipt = (bookingId) => {

    return axiosInstance.get(
        `/api/customer/bookings/receipt/${bookingId}`
    );
};

export const downloadReceiptPdf = (
    bookingId
) => {

    return axiosInstance.get(
        `/api/customer/bookings/receipt/pdf/${bookingId}`,
        {
            responseType: "blob",
        }
    );
};


export const downloadBookingHistory =
    () => {

        return axiosInstance.get(
            "/api/customer/bookings/history/pdf",
            {
                responseType:
                    "blob",
            }
        );
    };