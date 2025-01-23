'use client';
import Image from 'next/image';
import { api } from '@/trpc/react';

export default function NewsPage() {
  const { data: posts, isLoading } = api.post.getAllPublic.useQuery();
  //这是一个解构赋值的方法
  //isLoading 是用来判断是否正在加载
  //data 是用来获取数据
  //把获取来的数据放到posts中

  if (isLoading) {
    return <div>加载中...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">新闻</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts?.map((post) => (
          <div
            key={post.id}
            className="overflow-hidden rounded-lg border shadow-lg"
          >
            {post.imageUrl && (
              <div className="relative h-48 w-full">
                <Image
                  src={post.imageUrl}
                  alt={post.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="p-4">
              <h2 className="mb-2 text-xl font-semibold">{post.name}</h2>
              <p className="mb-2 text-gray-600">{post.summary}</p>
              <div className="flex justify-between text-sm text-gray-500">
                <span>{post.category}</span>
                {post.date && (
                  <span>
                    {new Date(
                      post.date as unknown as string,
                    ).toLocaleDateString()}
                  </span>
                  // post.data as unknown as string 是用来将post.date转换为字符串
                  // 先转换为unknown类型，再转换为string类型 属于强制转换
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
