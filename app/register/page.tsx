"use client";

import PWInput from "@/components/form/PWInput";
import PWSelect from "@/components/form/PWSelect";
import PWTextarea from "@/components/form/PWTextarea";
import Logo from "@/components/shared/Logo";
import { storage } from "@/firebase/firebase.config";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { X } from "lucide-react";
import Image from "next/image";
import React, { useRef, useState } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

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

const Register = () => {
  const methods = useForm({});
  const { handleSubmit } = methods;
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
    const profilePicture = selectedProfilePicture
      ? await uploadImageToFirebase(selectedProfilePicture)
      : null;
    const userData = {
      ...data,
      profilePicture,
    };

    console.log(userData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-green-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="p-6 sm:p-8">
            <div className="flex items-center justify-center mb-8">
              <Logo />
            </div>
            <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">
              Create an Account
            </h2>
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <PWInput
                      name={"name"}
                      label={"Name"}
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <PWInput
                      label={"Email"}
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <PWInput
                      label={"Password"}
                      name="password"
                      type="password"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <PWInput
                      placeholder="+1 (555) 000-0000"
                      label={"Phone Number"}
                      name="phone"
                      required
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <PWTextarea
                      label={"Address"}
                      placeholder="Enter your address"
                      name="address"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <PWSelect
                      label="Gender"
                      name="gender"
                      options={genderOptions}
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      className="flex h-14 w-full cursor-pointer items-center justify-center rounded-xl border-2 border-default-200 text-default-500 shadow-sm transition-all duration-100 hover:border-default-400"
                      htmlFor="image"
                    >
                      Upload Profile Picture (Optional)
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
                {previewUrl && (
                  <div className="mt-4 flex justify-end relative">
                    <span
                      onClick={handleRemoveImage}
                      className="hover:bg-red-400 cursor-pointer hover:scale-110 absolute z-50 top-2 right-2 bg-red-500 rounded-full text-white p-[1px]"
                    >
                      <X size={20} />
                    </span>
                    <div className="relative w-64 h-64">
                      <Image
                        src={previewUrl}
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
                  Register
                </Button>
              </form>
            </FormProvider>
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link href="/login" className="text-primary hover:underline">
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
