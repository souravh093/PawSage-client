"use server";

import { axiosInstance } from "@/lib/AxiosInstance";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const registerUser = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/auth/signup", userData);

    return data;
  } catch (error: any) {
    console.log(error.response?.data.errorMessages);
    throw new Error(error.response?.data || error.message);
  }
};

export const loginUser = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/auth/login", userData);

    if (data.success) {
      cookies().set("accessToken", data?.token?.accessToken);
      cookies().set("refreshToken", data?.token?.refreshToken);
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

export interface CustomJwtPayload extends JwtPayload {
  profilePicture?: string;
  id: string;
  email: string;
  premiumMember: boolean;
  role: string;
}

export const currentUser = async () => {
  const accessToken = cookies().get("accessToken")?.value;

  let decoded: CustomJwtPayload | null = null;

  if (accessToken) {
    decoded = jwtDecode<CustomJwtPayload>(accessToken);
  }

  return decoded;
};

export const getNewAccessToken = async () => {
  const refreshToken = cookies().get("refreshToken")?.value;

  try {
    const { data } = await axiosInstance({
      method: "POST",
      url: "/auth/refresh-token",
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const updateUserData = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.put("/users/me", userData);

    revalidateTag("userData");
    return data;
  } catch (error: any) {
    console.log(error.response.data);
  }
};
