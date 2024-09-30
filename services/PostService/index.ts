"use server";

import { axiosInstance } from "@/lib/AxiosInstance";
import { FieldValues } from "react-hook-form";

export const createPost = async (postData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/posts", postData);
    console.log(data)
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data || error.message);
  }
};
