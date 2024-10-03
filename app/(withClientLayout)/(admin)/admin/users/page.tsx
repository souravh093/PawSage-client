"use client";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/table";

import React, { useEffect, useState } from "react";
import { TUser } from "@/types";
import { getUsersAll } from "@/services/userFetch";
import { Skeleton } from "@nextui-org/skeleton";
import { Pagination } from "@nextui-org/pagination";
import { Avatar } from "@nextui-org/avatar";
import { Badge } from "@nextui-org/badge";
import { BadgeCheck } from "lucide-react";
import DeleteUserModal from "@/components/shared/modal/DeleteUserModal";

const Users = () => {
  const [users, setUsers] = useState<TUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getUsersAll({ page });
        setUsers(data?.data);
        setTotalPages(data.meta.totalPage);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [page]);

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
          <TableColumn>Image</TableColumn>
          <TableColumn>Name</TableColumn>
          <TableColumn>Phone Number</TableColumn>
          <TableColumn>Status</TableColumn>
          <TableColumn>Role</TableColumn>
          <TableColumn>Gender</TableColumn>
          <TableColumn>Action</TableColumn>
        </TableHeader>
        <TableBody>
          {users?.map(
            ({
              _id,
              email,
              name,
              phone,
              premiumMember,
              profilePicture,
              role,
              gender,
            }: TUser) => (
              <TableRow key={_id}>
                <TableCell className="flex gap-2 items-center">
                  <Badge
                    content={
                      premiumMember ? (
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
                        typeof profilePicture === "string" ? profilePicture : ""
                      }
                    />
                  </Badge>
                </TableCell>
                <TableCell>{name}</TableCell>
                <TableCell>{email}</TableCell>
                <TableCell>{phone}</TableCell>
                <TableCell>{role}</TableCell>
                <TableCell>{gender}</TableCell>
                <TableCell>
                  <DeleteUserModal userId={_id} />
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

export default Users;
