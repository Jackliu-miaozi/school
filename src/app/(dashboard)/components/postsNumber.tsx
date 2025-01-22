'use client';

import { api } from '@/trpc/react';

export default function PostsNumber() {
  const { data: posts, isLoading } = api.post.getAllPublic.useQuery();

  if (isLoading) {
    return (
      <div className="rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-2 text-lg font-semibold text-gray-800">总文章数</h2>
        <p className="text-3xl font-bold text-purple-600">加载中...</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg bg-white p-6 shadow-lg">
      <h2 className="mb-2 text-lg font-semibold text-gray-800">总文章数</h2>
      <p className="text-3xl font-bold text-purple-600">{posts?.length}</p>
    </div>
  );
}
