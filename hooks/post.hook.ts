import { createPost } from "@/services/PostService";
import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

export const usePost = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["post"],
    mutationFn: async (userData) => await createPost(userData),
    onSuccess: (data) => {
      toast.success(data.message || "Registration successful");
    },
    onError: (error: any) => {
      toast.error("Registration failed");
    },
  });
};
