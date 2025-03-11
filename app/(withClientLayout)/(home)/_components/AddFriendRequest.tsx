"use client";

import {
  useCancelFriendRequest,
  useCheckFriendRequest,
  useFriendRequest,
} from "@/hooks/friend.hook";
import { Button } from "@nextui-org/button";
import React, { useEffect, useState } from "react";

type AddFriendRequestProps = {
  data: {
    userId: string;
    friendId: string;
  };
};

const AddFriendRequest = ({ data }: AddFriendRequestProps) => {
  const [isFollowing, setIsFollowing] = useState<boolean | null>(null);
  const { mutate: friendRequest } = useFriendRequest();
  const { mutate: cancelFriendRequest } = useCancelFriendRequest();
  const { data: friendCheck } = useCheckFriendRequest(data);

  useEffect(() => {
    if (friendCheck) {
      setIsFollowing(friendCheck?.data?.userId === data?.userId);
    }
  }, [friendCheck, data?.userId]);

  const handleFriendRequest = async () => {
    if (isFollowing) {
      cancelFriendRequest(data, {
        onSuccess: () => {
          setIsFollowing(false);
        },
      });
    } else {
      friendRequest(data, {
        onSuccess: () => {
          setIsFollowing(true);
        },
      });
    }
  };
  
  return (
    <Button
      onClick={handleFriendRequest}
      size="sm"
      color={isFollowing ? "danger" : "primary"}
      variant="solid"
    >
      {isFollowing ? "Cancel" : "Add Friend"}
    </Button>
  );
};

export default AddFriendRequest;
