import React from "react";
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { Avatar } from "@nextui-org/avatar";
import { TPost, TUser } from "@/types/post.interface";
import Image from "next/image";
import ContentPost from "@/app/(withClientLayout)/(home)/@feed/_components/ContentPost";
import Followers from "../shared/Followers";
import ButtonGroup from "./ButtonGroup";
import Comment from "./Comment";
import { TPostComment } from "@/types/comment.interface";
import { CustomJwtPayload } from "@/services/AuthService";
import Link from "next/link";
import EditComment from "./EditComment";

interface PostCardProps {
  data: TPost;
  comments: TPostComment[];
  userData: CustomJwtPayload | null;
  details?: boolean;
}

const PostCard: React.FC<PostCardProps> = ({
  data,
  comments,
  userData,
  details,
}) => {
  const { title, _id, category, content, isPremium, likes, thumbnail, userId } =
    data;

  const createComment = userData?.email ? (
    <Comment postId={_id} userData={userData} />
  ) : null;

  return (
    <Card className="w-full">
      <CardHeader className="justify-between">
        <div className="flex gap-5">
          <Avatar
            isBordered
            radius="full"
            size="md"
            src={userId?.profilePicture}
          />
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">
              {userId?.name}
            </h4>
            <h5 className="text-small tracking-tight text-default-400">
              {userId?.email}
            </h5>
          </div>
        </div>
        <Followers userId={userId?._id} userData={userData} />
      </CardHeader>
      <CardBody className="px-3 py-0 text-small text-default-400">
        <Link href={`/${_id}`}>
          <h2 className="text-black dark:text-white my-3 text-lg">{title}</h2>
          <Image
            alt="Card background"
            className="object-cover rounded-xl w-full h-96"
            src={thumbnail || "/default-thumbnail.png"}
            width={270}
            height={270}
          />
          <span className="py-2 flex gap-2 flex-col">
            <ContentPost details={details} content={content} />
          </span>
        </Link>

        <div>
          <div>
            <div className="flex gap-3 mb-3">
              <div className="flex gap-1">
                <p className="font-semibold text-default-400 text-small">
                  {likes}
                </p>
                <p className=" text-default-400 text-small">Votes</p>
              </div>
            </div>
          </div>
          {userData?.email && (
            <>
              <div className="my-4 bg-gray-300 dark:bg-gray-700 h-[1px]"></div>
              <ButtonGroup postId={_id} userId={userData?.id} />
            </>
          )}
          <div className="my-4 bg-gray-300 dark:bg-gray-700 h-[1px]"></div>

          <div>
            {comments?.map((comment: TPostComment) => (
              <div key={comment._id} className="flex items-center my-3 gap-1">
                <Avatar src={comment?.userId?.profilePicture} />
                <div className="flex justify-between gap-2 py-1 bg-gray-100 px-5 rounded-2xl dark:bg-gray-900">
                  <div>
                    <h1 className="text-black">{comment?.userId?.name}</h1>
                    <p>{comment.comment}</p>
                  </div>
                  <EditComment comment={comment} />
                </div>
              </div>
            ))}
          </div>
          {createComment}
        </div>
      </CardBody>
    </Card>
  );
};

export default PostCard;
