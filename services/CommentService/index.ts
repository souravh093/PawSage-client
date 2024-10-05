"use server";

import { axiosInstance } from "@/lib/AxiosInstance";
import { revalidateTag } from "next/cache";
import { FieldValues } from "react-hook-form";

export const createComment = async (commentData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/comments", commentData);

    revalidateTag("posts");

    return data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.response?.data || error.message);
  }
};

export const deleteComment = async (commentId: string | undefined) => {
  try {
    const { data } = await axiosInstance.delete(`/comments/${commentId}`);

    revalidateTag("posts");

    return data;
  } catch (error: any) {
    console.log(error.response.data.message);
    // throw Error(error.response?.data || error.message);
  }
};

export const updateComment = async (commentData: FieldValues) => {
  try {
    const { data } = await axiosInstance.put(`/comments/${commentData.id}`, {
      comment: commentData.comment,
    });

    revalidateTag("posts");
    return data;
  } catch (error: any) {
    console.log(error.response.data.message);
    // throw new Error(error.response?.data || error.message);
  }
};
