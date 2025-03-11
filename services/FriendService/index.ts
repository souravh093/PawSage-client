"use server";

import { axiosInstance } from "@/lib/AxiosInstance";
import { revalidateTag } from "next/cache";
import { FieldValues } from "react-hook-form";

export const friendRequest = async (requestData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post(`/friends/request`, requestData);

    revalidateTag("friends");
    return data;
  } catch (error: any) {
    console.log(error.response.data.message);
  }
};

export const cancelFriendRequest = async (requestData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post(`/friends/request`, requestData);

    revalidateTag("friends");

    return data;
  } catch (error: any) {
    console.log(error.response.data.message);
  }
};

export const checkFriendRequestStatus = async (queryData: FieldValues) => {
  try {
    const { data } = await axiosInstance.get(`/friends/status`, {
      params: {
        userId: queryData.userId,
        friendId: queryData.friendId,
      },
    });

    console.log(data);
    return data;
  } catch (error: any) {
    console.log(error.response.data.message);
  }
};

export const getFriendRequests = async (userId: string) => {
  try {
    const { data } = await axiosInstance.get(`/friends/request/${userId}`, {
      headers: {},
    });
    return data;
  } catch (error: any) {
    console.log(error.response.data.message);
  }
};

export const acceptFriendRequest = async (requestData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post(`/friends/accept`, requestData);

    revalidateTag("friends");

    return data;
  } catch (error: any) {
    console.log(error.response.data.message);
  }
};
