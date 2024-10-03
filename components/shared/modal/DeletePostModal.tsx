/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useDeletePost } from "@/hooks/post.hook";
import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { Spinner } from "@nextui-org/spinner";
import { Trash2 } from "lucide-react";

export default function DeletePostModal({ postId }: { postId: string }) {
  const { mutate: deletePost, isPending } = useDeletePost();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const handleDeleteSubmit = () => {
    deletePost(postId);
  };
  return (
    <>
      <span onClick={onOpen}>
        <Trash2 className="text-red-500 hover:text-red-600 cursor-pointer hover:bg-red-300 rounded-sm" />
      </span>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Are you Sure
              </ModalHeader>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={handleDeleteSubmit}
                >
                  {isPending ? <Spinner /> : "Delete"}
                </Button>
                <Button color="primary" onPress={onClose}>
                  Cancel
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
