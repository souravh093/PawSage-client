"use client";
import { useAcceptFriendRequest } from "@/hooks/friend.hook";
import { Button } from "@nextui-org/button";
import React from "react";

type AddFriendRequestProps = {
  data: {
    userId: string;
    friendId: string;
  };
};

const Confirm = ({ data }: AddFriendRequestProps) => {
  const { mutate: handleAcceptFriend } = useAcceptFriendRequest();

  const handleAccept = async () => {
    handleAcceptFriend(data, {
      onSuccess: () => {
        console.log("Friend Request Accepted");
      },
    });
  };

  return (
    <div className="space-x-2">
      <Button
        onClick={handleAccept}
        size="sm"
        className="bg-green-500 text-white"
        variant="flat"
      >
        Confirm
      </Button>
    </div>
  );
};

export default Confirm;
