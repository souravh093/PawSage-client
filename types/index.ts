import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface IInput {
  variant?: "flat" | "bordered" | "faded" | "underlined";
  size?: "sm" | "md" | "lg";
  required?: boolean;
  defaultValue?: string;
  type?: string;
  label: string;
  placeholder?: string;
  name: string;
  isDisabled?: boolean;
}

export type TRole = "admin" | "user";
export type TUser = {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  profilePicture: string;
  passwordChangedAt: Date;
  _id?: string;
  bio: string;
  gender?: string;
  premiumMember?: boolean;
  transactionId?: string;
  status: "in-progress" | "blocked";
  isDeleted: boolean;
  role?: TRole;
};
