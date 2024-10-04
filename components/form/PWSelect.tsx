import { IInput } from "@/types";
import { Select, SelectItem } from "@nextui-org/select";
import React from "react";
import { useFormContext } from "react-hook-form";

interface IProps extends IInput {
  options: {
    key: string;
    label: string;
  }[];
}

const PWSelect = ({
  variant = "bordered",
  name,
  label,
  options,
  isDisabled,
  defaultValue,
}: IProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const defaultSelectedKeys = defaultValue ? [defaultValue] : [];

  return (
    <Select
      defaultSelectedKeys={defaultSelectedKeys}
      errorMessage={errors[name] ? (errors[name]?.message as string) : ""}
      variant={variant}
      label={label}
      {...register(name)}
      isDisabled={isDisabled}
    >
      {options.map((option, index) => (
        <SelectItem key={option.key}>{option.label}</SelectItem>
      ))}
    </Select>
  );
};

export default PWSelect;
