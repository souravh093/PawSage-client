"use server"
import { axiosInstance } from "@/lib/AxiosInstance";
import { FieldValues } from "react-hook-form";

export const forgetPassword = async (email: string) => {
  try {
    const { data } = await axiosInstance.post("/auth/forget-password", {
      email,
    });

    return data;
  } catch (error: any) {
    console.log(error.response.data);
  }
};

export const resetPassword = async (resetData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post(
      "/auth/reset-password",
      resetData
    );
    return data;
  } catch (error: any) {
    console.log(error.response.data);
  }
};
