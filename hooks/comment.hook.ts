import {
  createComment,
  deleteComment,
  updateComment,
} from "@/services/CommentService";
import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

export const useComment = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["comment"],
    mutationFn: async (userData) => await createComment(userData),
    onSuccess: (data) => {
      toast.success(data.message || "Registration successful");
    },
    onError: (error: any) => {
      toast.error("Registration failed");
    },
  });
};

export const useDeleteComment = () => {
  return useMutation<any, Error, string | undefined>({
    mutationKey: ["comment"],
    mutationFn: async (commentId) => await deleteComment(commentId),
    onSuccess: (data) => {
      toast.success(data.message || "Registration successful");
    },
    onError: (error: any) => {
      toast.error("Registration failed");
    },
  });
};

export const useUpdateComment = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["comment"],
    mutationFn: async (userData) => await updateComment(userData),
    onSuccess: (data) => {
      toast.success(data.message || "Registration successful");
    },
    onError: (error: any) => {
      toast.error("Registration failed");
    },
  });
};
