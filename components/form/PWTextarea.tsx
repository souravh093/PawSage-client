import { IInput } from "@/types";
import { Textarea } from "@nextui-org/input";
import React from "react";
import { useFormContext } from "react-hook-form";

interface IProps extends IInput {}


const PWTextarea = ({
    variant = "bordered",
    size = "md",
    required = false,
    type =  "text",
    label,
    placeholder,
    name,
    defaultValue,
}: IProps) => {
    const {register, formState: {errors}} = useFormContext();
  return (
  <Textarea
    variant={variant}
    size={size}
    required={required}
    type={type}
    label={label}
    placeholder={placeholder}
    {...register(name)}
    defaultValue={defaultValue}
    minRows={4}
  />
);
};

export default PWTextarea;
