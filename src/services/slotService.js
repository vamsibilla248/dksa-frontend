// src/services/slotService.js

import axiosInstance from "../api/axiosConfig";

export const getSlotsByDate = (
  turfId,
  date
) => {

  return axiosInstance.get(
    `/api/customer/slots?turfId=${turfId}&date=${date}`
  );
};