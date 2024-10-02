import { deleteUser } from "@/services/UserService";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteUser = () => {
  return useMutation<any, Error, string>({
    mutationKey: ["users"],
    mutationFn: async (userId) => await deleteUser(userId),
    onSuccess: (data) => {
      toast.success(data.message || "User Deleted successful");
    },
    onError: (error: any) => {
      console.log(error);
      toast.error("User Deleted failed");
    },
  });
};
