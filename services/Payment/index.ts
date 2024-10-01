"use server"

import { axiosInstance } from "@/lib/AxiosInstance";

export const createPayment = async (amount: string) => {
  try {
    const { data } = await axiosInstance.post("/payments/monetization", {
      amount,
    });

    return data;
  } catch (error: any) {
    console.log(error.response.data);
  }
};
