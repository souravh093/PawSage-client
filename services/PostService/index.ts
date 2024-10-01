"use server";

import { axiosInstance } from "@/lib/AxiosInstance";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

export const createPost = async (postData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/posts", postData);
    return data;
  } catch (error: any) {
    console.log(error.response.data.message)
    // toast.error(error.response.data.message || "Something went wrong");
  }
};
