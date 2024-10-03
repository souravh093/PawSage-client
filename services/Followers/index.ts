"use server";

import { axiosInstance } from "@/lib/AxiosInstance";
import { revalidateTag } from "next/cache";
import { FieldValues } from "react-hook-form";

export const createFollower = async (followerData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/followers", followerData);

    revalidateTag("followers");
    return data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.response?.data || error.message);
  }
};

export const unFollow = async (followerId: string | undefined) => {
  try {
    const { data } = await axiosInstance.delete("/followers", {
      params: {
        id: followerId,
      },
    });
    return data;
  } catch (error: any) {
    console.log(error.response.data.message);
    throw new Error(error.response?.data || error.message);
  }
};

export const checkFollowing = async (followerData: FieldValues) => {
  try {
    const { data } = await axiosInstance.get(`/followers/checkFollow`, {
      params: {
        userId: followerData.userId,
        followerId: followerData.followerId,
      },
    });

    console.log(data)
    return data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.response?.data || error.message);
  }
};

