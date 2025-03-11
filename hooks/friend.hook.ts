import {
  acceptFriendRequest,
  cancelFriendRequest,
  checkFriendRequestStatus,
  friendRequest,
} from "@/services/FriendService";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

export const useFriendRequest = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["friends"],
    mutationFn: async (requestData) => await friendRequest(requestData),
    onSuccess: (data) => {
      toast.success(data.message || "Fetch Data successful");
    },
    onError: (error: any) => {
      console.log(error);
      toast.error(error.message);
    },
  });
};

export const useAcceptFriendRequest = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["friends"],
    mutationFn: async (requestData) => await acceptFriendRequest(requestData),
    onSuccess: (data) => {
      toast.success(data.message || "Fetch Data successful");
    },
    onError: (error: any) => {
      console.log(error);
      toast.error(error.response.message);
    },
  });
};

export const useCancelFriendRequest = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["friends"],
    mutationFn: async (requestData) => await cancelFriendRequest(requestData),
    onSuccess: (data) => {
      toast.success(data.message || "Fetch Data successful");
    },
    onError: (error: any) => {
      console.log(error);
      toast.error(error.response.message);
    },
  });
};

export const useCheckFriendRequest = (userData: any) => {
  return useQuery<any, Error, FieldValues>({
    queryKey: ["friends", userData.userId, userData.friendId],
    queryFn: async () => await checkFriendRequestStatus(userData),
  });
};
