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
