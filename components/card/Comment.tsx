"use client";
import { useComment } from "@/hooks/comment.hook";
import useDebounce from "@/hooks/debounce.hook";
import { currentUser, CustomJwtPayload } from "@/services/AuthService";
import { Avatar } from "@nextui-org/avatar";
import { Input } from "@nextui-org/input";
import React, { useState } from "react";

const Comment = ({
  userData,
  postId,
}: {
  userData: CustomJwtPayload | null;
  postId: string | undefined;
}) => {
  const { mutate: handleComment, isPending, isSuccess } = useComment();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const comment = e.currentTarget.value;
      handleComment({ comment, postId, userId: userData?.id });
    }

    if (isSuccess) {
      e.currentTarget.value = "";
    }
  };

  return (
    <div className="flex items-center justify-between my-3 gap-3">
      <Avatar src={userData?.profilePicture} />
      <Input
        onKeyDown={handleKeyDown}
        type="text"
        placeholder="Add a comment"
      />
    </div>
  );
};

export default Comment;
