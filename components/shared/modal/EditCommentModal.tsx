"use client";
import { useUpdateComment } from "@/hooks/comment.hook";
import { TPostComment } from "@/types/comment.interface";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { Edit2 } from "lucide-react";
import { useState } from "react";

export default function EditCommentModal({
  comment,
}: {
  comment: TPostComment;
}) {
  const [commentData, setCommentData] = useState(comment?.comment);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { mutate: updateComment, isPending: ePending } = useUpdateComment();

  const handleUpdate = (onClose: () => void) => {
    updateComment(
      { id: comment._id, comment: commentData },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  return (
    <>
      <Button
        onPress={onOpen}
        size="sm"
        variant="light"
        startContent={<Edit2 className="w-4 text-primary" />}
        className="px-1"
        isIconOnly
      />
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Edit Comment
              </ModalHeader>
              <ModalBody>
                <Input
                  fullWidth
                  defaultValue={comment.comment}
                  onChange={(e) => setCommentData(e.target.value)}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  isLoading={ePending}
                  onPress={() => handleUpdate(onClose)}
                >
                  Update
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
