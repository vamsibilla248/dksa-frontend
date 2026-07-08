import axiosInstance from "../api/axiosConfig";

// =====================================
// Get All Slots
// =====================================

export const getAllSlots = () => {
    return axiosInstance.get("/api/admin/slots/all");
};

// =====================================
// Get Slots By Turf & Date
// =====================================

export const getSlotsByDate = (turfId, date) => {
    return axiosInstance.get(
        `/api/admin/slots?turfId=${turfId}&date=${date}`
    );
};

// =====================================
// Get Slot By Id
// =====================================

export const getSlotById = (slotId) => {
    return axiosInstance.get(
        `/api/admin/slots/${slotId}`
    );
};

// =====================================
// Create Slot
// =====================================

export const createSlot = (slot) => {
    return axiosInstance.post(
        "/api/admin/slots",
        slot
    );
};

// =====================================
// Update Slot
// =====================================

export const updateSlot = (
    slotId,
    slot
) => {
    return axiosInstance.put(
        `/api/admin/slots/${slotId}`,
        slot
    );
};

// =====================================
// Delete Slot
// =====================================

export const deleteSlot = (
    slotId
) => {
    return axiosInstance.delete(
        `/api/admin/slots/${slotId}`
    );
};

// =====================================
// Update Slot Status
// =====================================

export const updateSlotStatus = (
    slotId,
    status
) => {
    return axiosInstance.put(
        `/api/admin/slots/${slotId}/status?status=${status}`
    );
};

// =====================================
// Calendar View
// =====================================

export const getCalendarSlots = (
    turfId,
    month,
    year
) => {
    return axiosInstance.get(
        `/api/admin/slots/calendar?turfId=${turfId}&month=${month}&year=${year}`
    );
};