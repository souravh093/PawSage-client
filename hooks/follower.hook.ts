import { checkFollowing, createFollower, unFollow } from "@/services/Followers";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

export const useFollowers = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["followers"],
    mutationFn: async (userData) => await createFollower(userData),
    onSuccess: (data) => {
      toast.success(data.message || "Followed successful");
    },
    onError: (error: any) => {
      toast.error("Follow failed");
    },
  });
};

export const useUnFollowers = () => {
  return useMutation<any, Error, string | undefined>({
    mutationKey: ["followers"],
    mutationFn: async (followerId) => await unFollow(followerId),
    onSuccess: (data) => {
      toast.success(data.message || "Followed successful");
    },
    onError: (error: any) => {
      console.log(error);
      toast.error("Follow failed");
    },
  });
};

export const useCheckFollowing = (userData: any) => {
  return useQuery<any, Error, FieldValues>({
    queryKey: ["follow"],
    queryFn: async () => await checkFollowing(userData),
  });
};

