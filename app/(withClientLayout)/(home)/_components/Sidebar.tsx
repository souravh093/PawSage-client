import Followers from "@/components/shared/Followers";
import { Avatar } from "@nextui-org/avatar";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import Image from "next/image";
import ContentPost from "../@feed/_components/ContentPost";

const Sidebar = ({
  users,
  userData,
  premiumPosts,
}: {
  users: any;
  userData: any;
  premiumPosts: any;
}) => {
  return (
    <div className="flex flex-col gap-5">
      <div className="w-full space-y-6">
        <Card>
          <CardHeader>
            <h1>Who to Follow</h1>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              {users.map(
                ({
                  _id,
                  profilePicture,
                  email,
                }: {
                  _id: string;
                  profilePicture: string;
                  email: string;
                }) => (
                  <div key={_id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar src={profilePicture || ""} />
                      <div>
                        <p className="font-medium">User </p>
                        <p className="text-sm text-gray-500">{email}</p>
                      </div>
                    </div>
                    <Followers userData={userData} userId={_id} />
                  </div>
                )
              )}
            </div>
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <h1>Premium Posts</h1>
        </CardHeader>
        <CardBody>
          <div className="space-y-4">
            {premiumPosts?.map(
              ({
                _id,
                title,
                thumbnail,
                content,
              }: {
                _id: string;
                title: string;
                thumbnail: string;
                content: string;
              }) => (
                <div key={_id} className="flex items-center space-x-3">
                  <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center">
                    <Image
                      src={thumbnail}
                      alt={title}
                      className="w-[64px] h-[64px] object-cover rounded-md"
                      width={64}
                      height={64}
                    />
                  </div>
                  <div>
                    <p className="font-medium">{title}</p>
                    <p className="text-sm text-gray-500">
                      <ContentPost content={content} />
                    </p>
                  </div>
                </div>
              )
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default Sidebar;
