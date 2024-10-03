"use client";
import { useUser } from "@/context/user.provider";
import {
  useCheckFollowing,
  useFollowers,
  useUnFollowers,
} from "@/hooks/follower.hook";
import { currentUser, CustomJwtPayload } from "@/services/AuthService";
import { Button } from "@nextui-org/button";
import { UserCheck, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

const Followers = ({
  userData,
  userId,
}: {
  userData: CustomJwtPayload | null;
  userId: string | undefined;
}) => {
  const router = useRouter();
  const { mutate: handleFollowers } = useFollowers();
  const { mutate: handleUnFollowers } = useUnFollowers();
  const { data: checkFollowing } = useCheckFollowing({
    userId,
    followerId: userData?.id,
  });

  const [isFollowing, setIsFollowing] = useState<boolean | null>(null);

  useEffect(() => {
    if (checkFollowing) {
      setIsFollowing(checkFollowing?.data?.userId === userId);
    }
  }, [checkFollowing, userId]);

  const handleFollower = () => {
    if (!userData?.email) {
      router.push("/login");
      return;
    }

    if (isFollowing) {
      handleUnFollowers(userData?.id, {
        onSuccess: () => {
          setIsFollowing(false);
        },
      });
    } else {
      handleFollowers(
        { userId, followerId: userData?.id },
        {
          onSuccess: () => {
            setIsFollowing(true);
          },
        }
      );
    }
  };

  if (userId === userData?.id) return null;

  return (
    <Button
      className={"bg-primary text-white border-default-200"}
      color="primary"
      radius="full"
      size="sm"
      onClick={handleFollower}
      variant={"bordered"}
      endContent={
        isFollowing ? <UserCheck size={16} /> : <UserPlus size={16} />
      }
    >
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
};

export default Followers;
