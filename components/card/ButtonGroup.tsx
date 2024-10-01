"use client";

import React from "react";
import { Button } from "@nextui-org/button";
import { ArrowDown, ArrowUp, Share } from "lucide-react";
import { useDownVote, useUpVote } from "@/hooks/vote.hook";

const ButtonGroup = ({
  postId,
  userId,
}: {
  postId: string | undefined;
  userId: string | undefined;
}) => {
  const { mutate: addVote, data } = useUpVote();
  console.log(data);
  const { mutate: addDownVote } = useDownVote();
  const handleUpVote = () => {
    addVote({ postId, userId, type: "upvote" });
  };

  const handleDownVote = () => {
    console.log("downvote");
    addDownVote({ postId, userId, type: "downvote" });
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
      <Button startContent={<Share />} variant="light" className="w-1/3">
        Share
      </Button>
    </div>
  );
};

export default ButtonGroup;
