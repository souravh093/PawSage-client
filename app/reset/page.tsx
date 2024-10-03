"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useRouter, useSearchParams } from "next/navigation";
import { useResetPassword } from "@/hooks/forgetPassword.hook";
import { Spinner } from "@nextui-org/spinner";

type FormData = {
  newPassword: string;
};

export default function ResetPasswordForm() {
  const { mutate: handleReset, isPending } = useResetPassword();
  const searchParams = useSearchParams();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    handleReset({
      email: searchParams.get("email"),
      token: searchParams.get("token"),
      newPassword: data.newPassword,
    });

    router.push("/login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold">Reset Password</h1>
          <p className="text-default-500">Enter your new password below</p>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Controller
              name="newPassword"
              control={control}
              rules={{
                required: "Password is required",
                minLength: {
                  value: 2,
                  message: "Password must be at least 8 characters",
                },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  type="password"
                  label="New Password"
                  variant="bordered"
                  isInvalid={!!errors.newPassword}
                  errorMessage={errors.newPassword?.message}
                />
              )}
            />
          </form>
        </CardBody>
        <CardFooter>
          <Button
            color="primary"
            className="w-full"
            type="submit"
            onClick={handleSubmit(onSubmit)}
          >
            {isPending ? <Spinner /> : "Reset Password"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
