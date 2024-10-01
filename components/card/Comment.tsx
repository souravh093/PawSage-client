"use client"
import { currentUser, CustomJwtPayload } from "@/services/AuthService";
import { Avatar } from "@nextui-org/avatar";
import { Input } from "@nextui-org/input";
import React from "react";

const Comment = ({ userData }: { userData: CustomJwtPayload | null }) => {
  return (
    <div className="flex items-center justify-between my-3 gap-3">
      <Avatar src={userData?.profilePicture} />
      <Input type="text" placeholder="Add a comment" />
    </div>
  );
};

export default Comment;
