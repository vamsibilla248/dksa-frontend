// src/services/adminBookingService.js

import axiosInstance
    from "../api/axiosConfig";

export const getAllBookings =
    () => {

        return axiosInstance.get(
            "/api/admin/bookings"
        );
    };

export const cancelBooking =
    (
        bookingId
    ) => {

        return axiosInstance.delete(
            `/api/admin/bookings/${bookingId}`
        );
    };

export const createOfflineBooking = (bookingData) => {
    return axiosInstance.post(
        "/api/admin/bookings/offline",
        bookingData
    );
};