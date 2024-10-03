import { downVote, upVote } from "@/services/Vote";
import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

export const useUpVote = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["upvote"],
    mutationFn: async (voteData) => await upVote(voteData),
    onSuccess: (data) => {
      toast.success(data.message || "Upvote successful");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Upvote failed");
    },
  });
};

export const useDownVote = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["downvote"],
    mutationFn: async (voteData) => await downVote(voteData),
    onSuccess: (data) => {
      toast.success(data.message || "Downvote successful");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Downvote failed");
    },
  });
};
