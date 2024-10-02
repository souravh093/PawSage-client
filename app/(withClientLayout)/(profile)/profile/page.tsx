import PostCard from "@/components/card/PostCard";
import Container from "@/components/shared/Container";
import { axiosInstance } from "@/lib/AxiosInstance";
import { currentUser } from "@/services/AuthService";
import { TPost } from "@/types/post.interface";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Edit, MapPinHouse, Phone, ShieldQuestion } from "lucide-react";
import Image from "next/image";
import React from "react";

const ProfilePage = async () => {
  const userData = await currentUser();
  const { data } = await axiosInstance.get(`/users/me`);
  const { data: followersPosts } = await axiosInstance.get("/followers/me");
  const { data: followersCount } = await axiosInstance.get("/followers/count");
  const { data: userInfo } = await axiosInstance.get(`/users/me`);
  console.log(userInfo);
  return (
    <Container>
      <div className="border border-gray-500">
        <Image
          width={1220}
          height={550}
          loading="lazy"
          alt="this is profile banner image"
          src={
            "https://images.unsplash.com/photo-1450778869180-41d0601e046e?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          placeholder="blur"
          className="w-full h-96 object-cover "
          blurDataURL={
            "https://images.unsplash.com/photo-1450778869180-41d0601e046e?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
        />
      </div>

      <div className="my-5">
        <div className="flex justify-between items-center mb-5">
          <div className="flex items-center gap-2">
            <Avatar className="w-44 h-44" src={userData?.profilePicture} />
            <div>
              <h1 className="font-bold text-2xl">{data?.data?.name}</h1>
              <p>{userData?.email}</p>
              <h3>{followersCount?.data?.followerCount} followers</h3>
              <h3>{followersCount?.data?.followingCount} following</h3>
            </div>
          </div>

          <div>
            <Button startContent={<Edit />}>Edit Profile</Button>
          </div>
        </div>
        <Divider />
        <div className="grid grid-cols-5 gap-5">
          <div className="col-span-2 my-5">
            <Card>
              <CardHeader>About</CardHeader>
              <CardBody className="flex flex-col gap-2">
                <div className="flex gap-2 items-center">
                  <Phone />
                  <span>{userInfo?.data?.phone}</span>
                </div>
                <div className="flex gap-2 items-center">
                  <MapPinHouse />
                  <span>{userInfo?.data?.address}</span>
                </div>
                <div className="flex gap-2 items-center">
                  <ShieldQuestion />
                  <span>{userInfo?.data?.gender}</span>
                </div>
              </CardBody>
            </Card>
          </div>

          <div className="col-span-3 my-5 flex flex-col gap-5">
            {followersPosts?.data?.map((post: TPost) => (
              <PostCard key={post._id} data={post} />
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ProfilePage;
