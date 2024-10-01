"use client";
import React, { useState, useEffect } from "react";
import PostCard from "@/components/card/PostCard";
import { TPost } from "@/types/post.interface";
import { getPosts } from "@/services/FetchPosts";

interface InfiniteScrollProps {
  searchQuery: string;
  categoryQuery: string;
  initialPosts: TPost[];
}

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({ searchQuery, categoryQuery, initialPosts }) => {
  const [posts, setPosts] = useState<TPost[]>(initialPosts);
  const [page, setPage] = useState(2);
  const [loading, setLoading] = useState(false);

  const loadMorePosts = async () => {
    setLoading(true);
    const { data } = await getPosts({ search: searchQuery, category: categoryQuery, page, limit: 3 });
    setPosts((prevPosts) => [...prevPosts, ...data.result]);
    setPage((prevPage) => prevPage + 1);
    setLoading(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
        loadMorePosts();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [page]);

  return (
    <div className="my-5 flex flex-col gap-5">
      {posts.map((post: TPost) => (
        <PostCard key={post._id} data={post} />
      ))}
      {loading && <div>Loading...</div>}
    </div>
  );
};

export default InfiniteScroll;