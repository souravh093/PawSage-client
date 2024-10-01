"use server";

import { axiosInstance } from "@/lib/AxiosInstance";
import { revalidateTag } from "next/cache";
import { FieldValues } from "react-hook-form";

export const createComment = async (commentData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/comments", commentData);

    revalidateTag("comments");

    return data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.response?.data || error.message);
  }
};
