import React from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Avatar } from "@nextui-org/avatar";
import { TPost } from "@/types/post.interface";
import Image from "next/image";
import ContentPost from "@/app/(withClientLayout)/(home)/@feed/_components/ContentPost";
import Followers from "../shared/Followers";
import { Divider } from "@nextui-org/divider";
import ButtonGroup from "./ButtonGroup";
import Comment from "./Comment";
import { currentUser } from "@/services/AuthService";
import { axiosInstance } from "@/lib/AxiosInstance";
import { TPostComment } from "@/types/comment.interface";

export default async function PostCard({ data }: { data: TPost }) {
  const { title, _id, category, content, isPremium, likes, thumbnail, userId } =
    data;

  const userData = await currentUser();

  const comments = await axiosInstance.get(`/comments/${_id}`);

  console.log(comments?.data?.data);
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
        <Followers />
      </CardHeader>
      <CardBody className="px-3 py-0 text-small text-default-400">
        <Image
          alt="Card background"
          className="object-cover rounded-xl w-full h-96"
          src={thumbnail || "/default-thumbnail.png"} // TODO
          width={270}
          height={270}
        />
        <span className="pt-2">
          <ContentPost content={content} />
        </span>

        <div>
          <div>
            <div className="flex gap-3 mb-3">
              <div className="flex gap-1">
                <p className="font-semibold text-default-400 text-small">4</p>
                <p className=" text-default-400 text-small">Following</p>
              </div>
              <div className="flex gap-1">
                <p className="font-semibold text-default-400 text-small">
                  97.1K
                </p>
                <p className="text-default-400 text-small">Followers</p>
              </div>
            </div>
          </div>
          <div className="my-4 bg-gray-300 dark:bg-gray-700 h-[1px]"></div>
          <ButtonGroup />
          <div className="my-4 bg-gray-300 dark:bg-gray-700 h-[1px]"></div>

          <div>
            {comments?.data?.data?.map((comment: TPostComment) => (
              <div key={comment._id} className="flex items-center my-3 gap-1">
                <Avatar src={comment?.userId?.profilePicture} />
                <div className="flex flex-col gap-[1px] py-1 bg-gray-100 px-5 rounded-2xl dark:bg-gray-900">
                  <h1 className="text-black">{comment?.userId?.name}</h1>
                  <p>{comment.comment}</p>
                </div>
              </div>
            ))}
          </div>
          <Comment userData={userData} />
        </div>
      </CardBody>
    </Card>
  );
}
