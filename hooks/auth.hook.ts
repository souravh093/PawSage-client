import { login, register } from "@/services/AuthService";
import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

export const useRegistration = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["register"],
    mutationFn: async (userData) => await register(userData),
    onSuccess: () => {
      toast.success("Registration successful");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useLogin = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["login"],
    mutationFn: async (userData) => await login(userData),
    onSuccess: () => {
      toast.success("Login successful");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
