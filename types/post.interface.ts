import { StaticImport } from "next/dist/shared/lib/get-img-props";

type TPostCategory = "Tip" | "Story";

export type TPost = {
  _id: string;
  title?: string;
  thumbnail?: string | StaticImport;
  category?: TPostCategory;
  content?: string;
  userId?: string;
  likes?: number;
  isPremium?: boolean;
};
