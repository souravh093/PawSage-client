import {
  createPost,
  deletePost,
  getPost,
  updatePost,
} from "@/services/PostService";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

export const usePost = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["post"],
    mutationFn: async (userData) => await createPost(userData),
    onSuccess: (data) => {
      toast.success(data.message || "Fetch Data successful");
    },
    onError: (error: any) => {
      toast.error("Fetch Data failed");
    },
  });
};

export const useDeletePost = () => {
  return useMutation<any, Error, string>({
    mutationKey: ["post"],
    mutationFn: async (postId) => await deletePost(postId),
    onSuccess: (data) => {
      toast.success(data.message || "Delete data successful");
    },
    onError: (error: any) => {
      toast.error("Fetch Data failed");
    },
  });
};

export const useGetPost = (postId: string) => {
  return useQuery<any, Error, FieldValues>({
    queryKey: ["post"],
    queryFn: async () => await getPost(postId),
  });
};

export const useUpdatePost = () => {
  return useMutation<any, Error, {userData: FieldValues, postId: string}>({
    mutationKey: ["post"],
    mutationFn: async ({ userData, postId }) =>
      await updatePost(postId, userData),
    onSuccess: (data) => {
      toast.success(data.message || "Update Post successful");
    },
    onError: (error: any) => {
      toast.error("Fetch Data failed");
    },
  });
};
