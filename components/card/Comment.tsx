"use client";
import { useComment } from "@/hooks/comment.hook";
import { CustomJwtPayload } from "@/services/AuthService";
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
  const { mutate: handleComment, isSuccess } = useComment();
  const [comment, setComment] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleComment({ comment, postId, userId: userData?.id });

      if (isSuccess) {
        setComment("");
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  return (
    <div className="flex items-center justify-between my-3 gap-3">
      <Avatar src={userData?.profilePicture} />
      <Input
        value={comment}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        type="text"
        placeholder="Add a comment"
      />
    </div>
  );
};

export default Comment;
