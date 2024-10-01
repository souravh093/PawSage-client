import { TUser } from "./post.interface";

export type TPostComment = {
    _id: string;
    postId: string;
    userId: TUser;
    comment: string;
}
