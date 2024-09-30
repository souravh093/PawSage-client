import CreatePostModal from "@/components/shared/modal/CreatePostModal";
import { currentUser } from "@/services/AuthService";
import { Avatar } from "@nextui-org/avatar";
import React from "react";

const CreatePost = async () => {
  const userData = await currentUser();
  console.log(userData);
  return (
    <div className="bg-white dark:bg-slate-800 shadow-medium p-3 flex gap-3">
      <Avatar className="cursor-pointer" src={userData?.profilePicture} />
      {userData && <CreatePostModal userId={userData?.id} />}
    </div>
  );
};

export default CreatePost;
