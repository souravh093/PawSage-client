"use server";

import { axiosInstance } from "@/lib/AxiosInstance";
import { revalidateTag } from "next/cache";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

export const upVote = async (voteData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/votes/upvote", voteData);

    revalidateTag("posts");

    return data;
  } catch (error: any) {
    console.log(error.response.data);
    toast.error("Upvote failed too");
  }
};

export const downVote = async (voteData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/votes/downvote", voteData);

    revalidateTag("posts");

    return data;
  } catch (error) {
    console.log(error);
  }
};
