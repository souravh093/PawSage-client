"use client";

import Logo from "@/components/shared/Logo";
import { Button } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/input";
import { Link } from "@nextui-org/link";
import { Select, SelectItem } from "@nextui-org/select";
import { X } from "lucide-react";
import Image from "next/image";
import React, { useRef, useState } from "react";

const Register = () => {
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
    }
  };

  const handleRemoveImage = () => {
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
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
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Input
                    label={"Name"}
                    id="name"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Input
                    label={"Email"}
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Input
                    label={"Password"}
                    id="password"
                    type="password"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    label={"Phone Number"}
                    required
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Textarea
                    label={"Address"}
                    id="address"
                    placeholder="Enter your address"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Select label={"Gender"}>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                    <SelectItem value="prefer-not-to-say">
                      Prefer not to say
                    </SelectItem>
                  </Select>
                </div>
                <div className="space-y-2">
                  <h3 htmlFor="profilePicture">Profile Picture (Optional)</h3>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="profilePicture"
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileChange}
                      ref={fileInputRef}
                    />
                    <Button
                      type="button"
                      variant="bordered"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <input type="file" accept="image/*" />
                      Upload Picture
                    </Button>
                    {previewUrl && (
                      <Button
                        type="button"
                        variant="bordered"
                        onClick={handleRemoveImage}
                      >
                        <X className="h-4 w-4 mr-2" />
                        Remove
                      </Button>
                    )}
                  </div>
                </div>
              </div>
              {previewUrl && (
                <div className="mt-4 flex justify-center">
                  <div className="relative w-32 h-32">
                    <Image
                      src={previewUrl}
                      alt="Profile picture preview"
                      fill
                      style={{ objectFit: "cover" }}
                      className="rounded-full"
                    />
                  </div>
                </div>
              )}
              <Button
                className="w-full bg-blue-500 hover:bg-blue-600 mt-6"
                type="submit"
              >
                Register
              </Button>
            </form>
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link href="/login" className="text-blue-500 hover:underline">
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Join our community of pet lovers and share your furry friends'
            adventures!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
