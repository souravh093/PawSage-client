"use server";

import { axiosInstance } from "@/lib/AxiosInstance";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const registerUser = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/auth/signup", userData);

    return data;
  } catch (error: any) {
    throw new Error(error.response?.data || error.message);
  }
};

export const loginUser = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/auth/login", userData);

    if (data.success) {
      cookies().set("accessToken", data?.data?.accessToken);
      cookies().set("refreshToken", data?.data?.refreshToken);
    }

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const logout = async () => {
  cookies().delete("accessToken");
  cookies().delete("refreshToken");
};

export const currentUser = async () => {
  const accessToken = cookies().get("accessToken")?.value;

  let decoded = null;

  if (accessToken) {
    decoded = jwtDecode(accessToken);
  }

  return decoded;
};
