"use client";
import dynamic from "next/dynamic";

// Dynamically import ReactQuillEditor with SSR disabled
const ReactQuillEditor = dynamic(
  () => import("@/components/shared/ReactQuill/ReactQuillEditor"),
  {
    ssr: false,
  }
);
import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { Edit2, X } from "lucide-react";
import React, { useRef, useState } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import PWInput from "@/components/form/PWInput";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/firebase/firebase.config";
import Image from "next/image";
import { useGetPost, useUpdatePost } from "@/hooks/post.hook";
import PWSelect from "@/components/form/PWSelect";
import { Spinner } from "@nextui-org/spinner";

const EditPostModal = ({ postId }: { postId: string }) => {
  const { mutate: handleUpdatePost, isPending: updatePending } =
    useUpdatePost();
  const { data: postData } = useGetPost(postId);

  const [content, setContent] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [selectedProfilePicture, setSelectedProfilePicture] =
    useState<File | null>(null);

  const methods = useForm();
  const { handleSubmit, reset } = methods;

  //   image handle
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);

      setSelectedProfilePicture(file);
    }
  };

  const uploadImageToFirebase = async (
    imageFile: File
  ): Promise<string | null | undefined> => {
    const storageRef = ref(storage, `images/${imageFile.name}`);

    setIsImageUploading(true);

    try {
      const snapshot = await uploadBytes(storageRef, imageFile);
      const downloadUrl = await getDownloadURL(snapshot.ref);

      return downloadUrl;
    } catch (error) {
      console.log("Error uploading image", error);
      return null;
    } finally {
      setIsImageUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const updatePostData = {
      ...data,
      content,
      thumbnail: selectedProfilePicture
        ? await uploadImageToFirebase(selectedProfilePicture)
        : postData?.data?.thumbnail,
    };


    await handleUpdatePost({ postId, userData: updatePostData });

    if (!updatePending) {
      reset();
      setPreviewUrl(null);
      setContent("");
      onOpenChange();
    }
  };


  return (
    <>
      <Button
        isIconOnly
        startContent={<Edit2 className="w-5" />}
        onPress={onOpen}
      ></Button>
      <Modal size="3xl" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex justify-between items-center">
                Modal Title
              </ModalHeader>
              <ModalBody className="overflow-y-auto max-h-[600px]">
                <FormProvider {...methods}>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-2">
                      <PWSelect
                        label="Category"
                        name="category"
                        options={[
                          { key: "Tip", label: "Tip" },
                          { key: "Story", label: "Story" },
                        ]}
                        defaultValue={postData?.data?.category}
                      />
                    </div>
                    <div className="space-y-2">
                      <PWInput
                        type="text"
                        placeholder="Enter you title"
                        label="Title"
                        defaultValue={postData?.data?.title}
                        name="title"
                      />
                    </div>
                    <div>
                      {(previewUrl || postData?.data?.thumbnail) && (
                        <div className="mt-4 flex justify-end relative py-2">
                          <span
                            onClick={handleRemoveImage}
                            className="hover:bg-red-400 cursor-pointer hover:scale-110 absolute z-50 top-2 right-2 bg-red-500 rounded-full text-white p-[1px]"
                          >
                            <X size={20} />
                          </span>
                          <div className="relative w-full h-64">
                            <Image
                              src={previewUrl || postData?.data?.thumbnail}
                              alt="Profile picture preview"
                              fill
                              style={{ objectFit: "contain" }}
                              className="rounded-md w-full"
                            />
                          </div>
                        </div>
                      )}
                      <div className="space-y-2">
                        <label
                          className="flex h-14 w-full cursor-pointer items-center justify-center rounded-xl border-2 border-default-200 text-default-500 shadow-sm transition-all duration-100 hover:border-default-400"
                          htmlFor="image"
                        >
                          Upload Image
                        </label>

                        <input
                          className="hidden"
                          id="image"
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          ref={fileInputRef}
                        />
                      </div>
                    </div>
                    <div>
                      <ReactQuillEditor
                        toolbarId="editor-toolbar"
                        value={!content ? postData?.data?.content : content}
                        setValue={setContent}
                        defaultValue={postData?.data?.content}
                      />
                    </div>

                    <Button
                      className="w-full bg-primary hover:bg-primaryLight"
                      type="submit"
                    >
                      {updatePending ? <Spinner /> : "Update Post"}
                    </Button>
                  </form>
                </FormProvider>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditPostModal;
