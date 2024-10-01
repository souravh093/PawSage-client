import { createPayment } from "@/services/Payment";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const usePayment = () => {
  return useMutation<any, Error, string>({
    mutationKey: ["post"],
    mutationFn: async (amount) => await createPayment(amount),
    onSuccess: (data) => {
      toast.success(data.message || "Registration successful");
    },
    onError: (error: any) => {
      toast.error("Registration failed");
    },
  });
};
