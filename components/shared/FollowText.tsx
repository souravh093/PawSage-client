import { axiosInstance } from "@/lib/AxiosInstance";
import React from "react";

const FollowText = async ({
  userId,
  followerId,
}: {
  userId: string | undefined;
  followerId: string | undefined;
}) => {
  const checkFollowing = await axiosInstance.get("/followers/checkFollow", {
    params: {
      userId: userId,
      followerId: followerId,
    },
  });
  return <>{checkFollowing?.data?.userId === userId ? "Unfollow" : "Follow"}</>;
};

export default FollowText;
