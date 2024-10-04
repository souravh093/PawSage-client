"use client";
import { getPosts } from "@/services/FetchPosts";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { TPost } from "@/types/post.interface";
import { Avatar } from "@nextui-org/avatar";
import { Skeleton } from "@nextui-org/skeleton";
import { Pagination } from "@nextui-org/pagination";
import { Badge } from "@nextui-org/badge";
import { BadgeCheck } from "lucide-react";
import DeletePostModal from "@/components/shared/modal/DeletePostModal";
import { useUser } from "@/context/user.provider";
import EditPostModal from "@/components/shared/modal/EditPostModal";

const MyPosts = () => {
  const [posts, setPosts] = useState<TPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const { user } = useUser();


  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await getPosts({ page, limit: 10, userId: user?.id });
        setPosts(data.result);
        setTotalPages(data.meta.totalPage);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [page, user]);

  if (loading) {
    return (
      <div className="p-4">
        <Skeleton>
          <div className="flex flex-col space-y-4">
            <div className="h-8 bg-gray-300 rounded"></div>
            <div className="h-8 bg-gray-300 rounded"></div>
            <div className="h-8 bg-gray-300 rounded"></div>
            <div className="h-8 bg-gray-300 rounded"></div>
            <div className="h-8 bg-gray-300 rounded"></div>
          </div>
        </Skeleton>
      </div>
    );
  }

  return (
    <div className="p-4">
      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>Thumbnail</TableColumn>
          <TableColumn>Title</TableColumn>
          <TableColumn>User</TableColumn>
          <TableColumn>Status</TableColumn>
          <TableColumn>Category</TableColumn>
          <TableColumn>Likes</TableColumn>
          <TableColumn>Action</TableColumn>
        </TableHeader>
        <TableBody>
          {posts?.map(
            ({
              _id,
              title,
              thumbnail,
              isPremium,
              category,
              likes,
              userId,
            }: TPost) => (
              <TableRow key={_id}>
                <TableCell>
                  <Avatar
                    src={typeof thumbnail === "string" ? thumbnail : ""}
                  />
                </TableCell>
                <TableCell>{title}</TableCell>
                <TableCell className="flex gap-2 items-center">
                  <Badge
                    content={
                      userId?.premiumMember ? (
                        <BadgeCheck
                          className="bg-primary rounded-full"
                          size={20}
                        />
                      ) : (
                        "Regular"
                      )
                    }
                    className="py-1"
                    color="primary"
                    size="sm"
                  >
                    <Avatar
                      src={
                        typeof userId?.profilePicture === "string"
                          ? userId?.profilePicture
                          : ""
                      }
                    />
                  </Badge>
                  <h3>{userId?.name}</h3>
                </TableCell>
                <TableCell>
                  <span>{isPremium ? "Premium" : "Regular"}</span>
                </TableCell>
                <TableCell>{category}</TableCell>
                <TableCell>{likes}</TableCell>
                <TableCell className="flex gap-2 items-center">
                  <DeletePostModal postId={_id} />
                  <EditPostModal postId={_id} />
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>

      <div className="flex justify-end my-5">
        <Pagination
          isCompact
          showControls
          total={totalPages || 0}
          initialPage={1}
          page={page}
          onChange={(newPage) => setPage(newPage)}
        />
      </div>
    </div>
  );
};

export default MyPosts;
