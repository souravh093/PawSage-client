"use client";

import { IInput } from "@/types";
import { Input } from "@nextui-org/input";
import React from "react";
import { useFormContext } from "react-hook-form";


interface IProps extends IInput {}
const PWInput = ({
  variant = "bordered",
  size = "md",
  required = false,
  type = "text",
  label,
  placeholder,
  defaultValue,
  isDisabled,
  name,
}: IProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Input
      variant={variant}
      size={size}
      required={required}
      disabled={isDisabled}
      isInvalid={!!errors[name]}
      errorMessage={errors[name] ? (errors[name]?.message as string) : ""}
      {...register(name)}
      type={type}
      defaultValue={defaultValue}
      label={label}
      placeholder={placeholder}
    />
  );
};

export default PWInput;
