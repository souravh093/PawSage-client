import { axiosInstance } from "@/lib/AxiosInstance";
import { TUser } from "@/types";
import { Avatar } from "@nextui-org/avatar";
import React from "react";

const Followers = async () => {
  const { data } = await axiosInstance.get(`/followers/me`);
  return (
    <div className="p-4">
      <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-700">
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
              Photo
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
              NAME
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
              Phone Number
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.data?.length < 1 ? (
            <tr className="border-t border-gray-200 dark:border-gray-700">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                No followers found
              </td>
            </tr>
          ) : (
            data?.data.map(
              ({
                _id,
                followerId: { name, email, phone, profilePicture },
              }: any) => (
                <tr
                  key={_id}
                  className="border-t border-gray-200 dark:border-gray-700"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    <Avatar src={profilePicture} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {phone}
                  </td>
                </tr>
              )
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Followers;
