import {
  loginUser,
  registerUser,
  updateUserData,
} from "@/services/AuthService";
import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

export const useRegistration = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["register"],
    mutationFn: async (userData) => await registerUser(userData),
    onSuccess: (data) => {
      toast.success(data.message || "Registration successful");
    },
    onError: (error: any) => {
      console.error("Error response: ", error);
      toast.error(error.response?.data?.message || "Registration failed");
    },
  });
};

export const useLogin = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["login"],
    mutationFn: async (userData) => await loginUser(userData),
    onSuccess: (data) => {
      toast.success("Login successful");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useUpdateProfile = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["updateProfile"],
    mutationFn: async (userData) => await updateUserData(userData),
    onSuccess: (data) => {
      toast.success("Profile updated successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
