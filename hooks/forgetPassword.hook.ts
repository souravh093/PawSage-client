import { forgetPassword, resetPassword } from "@/services/ForgetPasswor";
import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

export const useForgetPassword = () => {
  return useMutation<any, Error, string>({
    mutationKey: ["forgetPassword"],
    mutationFn: async (email) => await forgetPassword(email),
    onSuccess: (data) => {
      toast.success(data.message || "Reset Link send successful");
    },
    onError: (error: any) => {
      console.log(error);
      toast.error("Follow failed");
    },
  });
};

export const useResetPassword = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["resetPassword"],
    mutationFn: async (resetData) => await resetPassword(resetData),
    onSuccess: (data) => {
      toast.success(data.message || "Password Reset successful");
    },
    onError: (error: any) => {
      console.log(error);
      toast.error("Password Reset failed");
    },
  });
};
