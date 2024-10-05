"use client";
import React, { useState, useEffect, useRef } from "react";
import PostCard from "@/components/card/PostCard";
import { TPost } from "@/types/post.interface";
import { getPosts } from "@/services/FetchPosts";
import { CustomJwtPayload } from "@/services/AuthService";

interface PostListProps {
  initialPosts: TPost[];
  userData: CustomJwtPayload | null;
  currentUserData: any;
  searchQuery: string;
  categoryQuery: string;
}

const PostList: React.FC<PostListProps> = ({
  initialPosts,
  userData,
  currentUserData,
  searchQuery,
  categoryQuery,
}) => {
  const [posts, setPosts] = useState<TPost[]>(initialPosts);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const fetchInitialPosts = async () => {
      setLoading(true);
      const { data } = await getPosts({
        search: searchQuery,
        category: categoryQuery,
        page: 1,
        limit: 10,
      });
      setPosts(data.result || []);
      setPage(1);
      setHasMore(data.result.length > 0);
      setLoading(false);
    };

    fetchInitialPosts();
  }, [searchQuery, categoryQuery]);

  const loadMorePosts = async () => {
    setLoading(true);
    const { data } = await getPosts({
      search: searchQuery,
      category: categoryQuery,
      page: page + 1,
      limit: 10,
    });

    if (data?.result?.length > 0) {
      setPosts((prev) => [...prev, ...data.result]);
      setPage((prev) => prev + 1);
    } else {
      setHasMore(false);
    }
    setLoading(false);
  };

  const lastPostRef = (node: any) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        loadMorePosts();
      }
    });

    if (node) observer.current.observe(node);
  };

  return (
    <div className="my-5 flex flex-col gap-5">
      {posts.map((post, index) => {
        if (index === posts.length - 1) {
          return (
            <div ref={lastPostRef} key={post._id}>
              <PostCard
                key={post._id}
                data={post}
                userData={userData}
                premium={currentUserData?.data?.premiumMember}
              />
            </div>
          );
        } else {
          return (
            <PostCard
              key={post._id}
              data={post}
              userData={userData}
              premium={currentUserData?.data?.premiumMember}
            />
          );
        }
      })}

      {loading && <p>Loading more posts...</p>}
      {!hasMore && <p>No more posts to load.</p>}
    </div>
  );
};

export default PostList;