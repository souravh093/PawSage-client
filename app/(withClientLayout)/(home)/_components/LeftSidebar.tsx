import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Avatar } from "@nextui-org/avatar";
import { getUsers } from "@/services/User/indext";
import { currentUser } from "@/services/AuthService";
import AddFriendRequest from "./AddFriendRequest";
import { getFriendRequests } from "@/services/FriendService";
import Confirm from "./Confirm";

const LeftSidebar = async () => {
  const currentUserData = await currentUser();

  const { data: usersData } = await getUsers({ limit: 10 });

  if (!currentUserData) return null;

  const users = usersData?.filter(
    (user: any) => user._id !== currentUserData.id
  );

  const friendRequests = await getFriendRequests(currentUserData.id);
  
  return (
    <div className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto scrollbar-hide">
      <div className="md:col-span-3 mb-10">
        <div className="space-y-4 sticky top-20 max-h-screen overflow-y-auto">
          <Card>
            <CardHeader>
              <h4 className="text-large font-bold">Friend Requests</h4>
            </CardHeader>
            <CardBody>
              <ul className="space-y-2">
                {friendRequests?.data.length < 1 ? (
                  <li className="text-center text-sm text-gray-500">
                    No friend requests
                  </li>
                ) : (
                  friendRequests?.data.map((friend: any) => (
                    <li
                      key={friend._id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-2">
                        <Avatar
                          src={friend.userId?.profilePicture}
                          name={friend.userId.name}
                          size="sm"
                        />
                        <span className="text-sm font-medium">
                          {friend.userId.name}
                        </span>
                      </div>
                      <Confirm
                        data={{
                          userId: currentUserData.id,
                          friendId: friend.userId._id,
                        }}
                      />
                    </li>
                  ))
                )}
              </ul>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>
              <h4 className="text-large font-bold">People you may know</h4>
            </CardHeader>
            <CardBody>
              <div className="space-y-2">
                {users.map((friend: any) => (
                  <div
                    key={friend._id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-2">
                      <Avatar
                        src={friend.profilePicture}
                        name={friend.name}
                        size="sm"
                      />
                      <span className="text-sm font-medium">{friend.name}</span>
                    </div>

                    <AddFriendRequest
                      data={{
                        friendId: friend._id,
                        userId: currentUserData.id,
                      }}
                    />
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
