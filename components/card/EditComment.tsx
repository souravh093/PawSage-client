"use client";
import { Trash2 } from "lucide-react";
import React from "react";
import { Tooltip } from "@nextui-org/tooltip";
import { Button } from "@nextui-org/button";
import { useDeleteComment } from "@/hooks/comment.hook";
import { Spinner } from "@nextui-org/spinner";
import { TPostComment } from "@/types/comment.interface";
import { useUser } from "@/context/user.provider";
import EditCommentModal from "../shared/modal/EditCommentModal";

const EditComment = ({ comment }: { comment: TPostComment }) => {
  const { user } = useUser();
  const { mutate: deleteComment, isPending: dPending } = useDeleteComment();

  if (user?.id !== comment?.userId?._id) return null;

  const handleDeleteClick = () => {
    deleteComment(comment._id);
  };

  return (
    <div className="flex items-center">
      <Tooltip content="Edit Comment" placement="top">
        <EditCommentModal comment={comment} />
      </Tooltip>
      <Tooltip content="Delete Comment" placement="top">
        {dPending ? (
          <Spinner />
        ) : (
          <Button
            size="sm"
            variant="light"
            startContent={<Trash2 className="w-4 text-red-500" />}
            onClick={handleDeleteClick}
            className="px-1"
            isIconOnly
          />
        )}
      </Tooltip>
    </div>
  );
};

export default EditComment;
