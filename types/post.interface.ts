import { StaticImport } from "next/dist/shared/lib/get-img-props";

type TPostCategory = "Tip" | "Story";

export type TUser = {
  _id: string;
  name: string;
  email: string;
  profilePicture: string;
  premiumMember: boolean;
}

export type TComment = {
  _id: string;
  postId: string;
  userId: TUser;
  comment: string;
};

export type TPost = {
  _id: string;
  title?: string;
  thumbnail?: string | StaticImport;
  category?: TPostCategory;
  content?: string;
  userId?: TUser | undefined;
  likes?: number;
  isPremium?: boolean;
  comments?: TComment[];
};
