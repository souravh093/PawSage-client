"use server";

import { axiosInstance } from "@/lib/AxiosInstance";
import { revalidateTag } from "next/cache";

export const deleteUser = async (userId: string) => {
  try {
    const { data } = await axiosInstance.delete(`/users/${userId}`);

    revalidateTag("users");
    return data;
  } catch (error) {
    console.log(error);
  }
};
