"use client";

import React from "react";
import { Button } from "@nextui-org/button";
import { ArrowDown, ArrowUp, Share } from "lucide-react";
import { useDownVote, useUpVote } from "@/hooks/vote.hook";
import envConfig from "@/config/envConfig";
// import envConfig from "@/config/envConfig";

const ButtonGroup = ({
  postId,
  userId,
}: {
  postId: string | undefined;
  userId: string | undefined;
}) => {
  const { mutate: addVote } = useUpVote();
  const { mutate: addDownVote } = useDownVote();

  const handleUpVote = () => {
    addVote({ postId, userId, type: "upvote" });
  };

  const handleDownVote = () => {
    addDownVote({ postId, userId, type: "downvote" });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Check out this post!",
          url: `${envConfig.baseClient}@feed/${postId}`,
          text: "I found this interesting post, take a look!",
        })
        .then(() => {
          console.log("Shared successfully");
        })
        .catch((error) => {
          console.error("Error sharing:", error);
        });
    } else {
      alert("Web Share API not supported in this browser.");
    }
  };

  return (
    <div className="flex my-2">
      <Button
        onClick={handleUpVote}
        startContent={<ArrowUp />}
        variant="light"
        className="w-1/3"
      >
        Up Vote
      </Button>
      <Button
        onClick={handleDownVote}
        startContent={<ArrowDown />}
        variant="light"
        className="w-1/3"
      >
        Down Vote
      </Button>
      <Button
        onClick={handleShare}
        startContent={<Share />}
        variant="light"
        className="w-1/3"
      >
        Share
      </Button>
    </div>
  );
};

export default ButtonGroup;
