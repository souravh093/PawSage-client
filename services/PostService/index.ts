"use server";

import { axiosInstance } from "@/lib/AxiosInstance";
import { revalidateTag } from "next/cache";
import { FieldValues } from "react-hook-form";

export const createPost = async (postData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/posts", postData);

    revalidateTag("posts");
    return data;
  } catch (error: any) {
    console.log(error.response.data.message);
    // toast.error(error.response.data.message || "Something went wrong");
  }
};


export const deletePost = async (postId: string) => {
  try {
    const { data } = await axiosInstance.delete(`/posts/${postId}`);

    revalidateTag("posts");
    return data;
  } catch (error: any) {
    console.log(error.response.data.message);
    // toast.error(error.response.data.message || "Something went wrong");
  }
};

export const getAllPosts = async () => {
  try {
    const {data} = await axiosInstance.get("/posts");

    return data;
  } catch (error: any) {
    console.log(error.response.data.message)
  }
}

export const getPost = async (postId: string) => {
  try {
    const {data} = await axiosInstance.get(`/posts/${postId}`);
    
    return data;
  } catch (error: any) {
    console.log(error.response.data.message)
  }
}

export const updatePost = async (postId: string, postData: FieldValues) => {
  try {
    const {data} = await axiosInstance.put(`/posts/${postId}`, postData);

    revalidateTag("posts");
    return data;
  } catch (error: any) {
    console.log(error?.response?.data.message?.errorMessages)
    console.log(error.response.data.message)
  }
}
