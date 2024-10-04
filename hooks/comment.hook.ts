import { createComment, deleteComment, updateComment } from "@/services/CommentService";
import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

export const useComment = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["comment"],
    mutationFn: async (userData) => await createComment(userData),
    onSuccess: (data) => {
      toast.success(data.message || "Comment successful");
    },
    onError: (error: any) => {
      toast.error("Comment failed");
    },
  });
};


export const useDeleteComment = () => {
  return useMutation<any, Error, string | undefined>({
    mutationKey: ["comment2"],
    mutationFn: async (commentId) => await deleteComment(commentId),
    onSuccess: (data) => {
      toast.success(data.message || "Comment delete successful");
    },
    onError: (error: any) => {
      toast.error("comment failed");
    },
  });
}

export const useUpdateComment = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["comment3"],
    mutationFn: async (userData) => await updateComment(userData),
    onSuccess: (data) => {
      toast.success(data.message || "Comment update successful");
    },
    onError: (error: any) => {
      toast.error("Registration failed");
    },
  });
};