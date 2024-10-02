"use client";
import dynamic from "next/dynamic";

// Dynamically import ReactQuillEditor with SSR disabled
const genderOptions = [
  {
    key: "male",
    label: "Male",
  },
  {
    key: "female",
    label: "Female",
  },
  {
    key: "other",
    label: "Other",
  },
];
import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { Edit, Plus, X } from "lucide-react";
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
import PWSelect from "@/components/form/PWSelect";
import PWTextarea from "@/components/form/PWTextarea";
import { TUser } from "@/types";
import { useUpdateProfile } from "@/hooks/auth.hook";
import { Spinner } from "@nextui-org/spinner";

const EditProfileModal = ({ userData }: { userData: TUser }) => {
  const { name, address, gender, email, profilePicture, phone } = userData;
  console.log(profilePicture);
  const { mutate: updateProfile, isPending, isSuccess } = useUpdateProfile();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const methods = useForm({});
  const { handleSubmit, reset } = methods;
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [selectedProfilePicture, setSelectedProfilePicture] =
    useState<File | null>(null);
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
    const profilePhotos = selectedProfilePicture
      ? await uploadImageToFirebase(selectedProfilePicture)
      : null;
    const userData = {
      ...data,
      profilePicture: profilePhotos ? profilePhotos : profilePicture,
    };

    await updateProfile(userData);

    if (!isPending && isSuccess) {
      reset();
      setPreviewUrl(null);
      onOpenChange();
    }
  };

  return (
    <>
      <Button
        startContent={<Edit />}
        onPress={onOpen}
        className="bg-gray-200 dark:bg-slate-950  px-3 text-left py-2 rounded-3xl flex-1 cursor-pointer"
      >
        Edit Profile
      </Button>
      <Modal size="3xl" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex justify-between items-center">
                Modal Title
              </ModalHeader>
              <ModalBody className="overflow-y-auto max-h-[600px]">
                <FormProvider {...methods}>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <PWInput
                          name={"name"}
                          label={"Name"}
                          placeholder="Enter your name"
                          defaultValue={name}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <PWInput
                          label={"Email"}
                          name="email"
                          type="email"
                          placeholder="your@email.com"
                          defaultValue={email}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <PWInput
                          placeholder="+1 (555) 000-0000"
                          label={"Phone Number"}
                          name="phone"
                          defaultValue={phone}
                          required
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <PWTextarea
                          label={"Address"}
                          placeholder="Enter your address"
                          name="address"
                          defaultValue={address}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <PWSelect
                          label="Gender"
                          name="gender"
                          defaultValue={gender}
                          options={genderOptions}
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          className="flex h-14 w-full cursor-pointer items-center justify-center rounded-xl border-2 border-default-200 text-default-500 shadow-sm transition-all duration-100 hover:border-default-400"
                          htmlFor="image"
                        >
                          Upload Profile Picture
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
                    {(previewUrl || profilePicture) && (
                      <div className="mt-4 flex justify-end relative">
                        <span
                          onClick={handleRemoveImage}
                          className="hover:bg-red-400 cursor-pointer hover:scale-110 absolute z-50 top-2 right-2 bg-red-500 rounded-full text-white p-[1px]"
                        >
                          <X size={20} />
                        </span>
                        <div className="relative w-64 h-64">
                          <Image
                            src={previewUrl || profilePicture}
                            alt="Profile picture preview"
                            fill
                            style={{ objectFit: "cover" }}
                            className="rounded-md"
                          />
                        </div>
                      </div>
                    )}
                    <Button
                      className="w-full bg-primary hover:bg-primaryLight mt-6"
                      type="submit"
                    >
                      {isPending || isImageUploading ? (
                        <Spinner />
                      ) : (
                        "Update Profile"
                      )}
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

export default EditProfileModal;
