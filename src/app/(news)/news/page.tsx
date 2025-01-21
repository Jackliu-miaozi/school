'use client';
import { useState } from 'react';
import Image from 'next/image';

interface NewsItem {
  id: number;
  title: string;
  summary: string;
  date: string;
  imageUrl: string;
  category: string;
}

export default function NewsPage() {
  const [page, setPage] = useState(1);
  const [news] = useState<NewsItem[]>([
    {
      id: 1,
      title: '我校在2024年全国高中生物理竞赛中取得优异成绩',
      summary: '在近日举行的全国高中生物理竞赛中，我校学子表现出色，共有15名同学获得省级一等奖...',
      date: '2024-03-20',
      imageUrl: '/news/physics-competition.jpg',
      category: '竞赛获奖'
    },
    {
      id: 2,
      title: '青州一中举办2024年春季运动会',
      summary: '为促进学生身心健康发展，培养体育精神，我校于本周成功举办了2024年春季运动会...',
      date: '2024-03-18',
      imageUrl: '/news/sports-meeting.jpg',
      category: '校园活动'
    },
    // 更多新闻项...
  ]);

  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber);
  };

  return (
    <div className="min-h-screen bg-base-200 pt-10">
      {/* 页面标题 */}
      <div className="bg-base-100 shadow-sm mb-6 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold">校园新闻</h1>
        </div>
      </div>

      {/* 新闻列表 */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item) => (
            <div key={item.id} className="card bg-base-100 shadow-xl hover:scale-[1.02] transition-transform">
              <figure>
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  width={400}
                  height={192}
                  className="h-48 w-full object-cover"
                />
              </figure>
              <div className="card-body">
                <div className="mb-3">
                  <div className="badge badge-primary">{item.category}</div>
                </div>
                <h2 className="card-title">{item.title}</h2>
                <p className="text-base-content/70">{item.summary}</p>
                <div className="card-actions justify-between items-center mt-4">
                  <span className="text-sm text-base-content/60">{item.date}</span>
                  <button className="btn btn-primary btn-sm rounded-full">阅读更多</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 分页控件 */}
        <div className="flex justify-center mt-8">
          <div className="join">
            {Array.from({length: 5}, (_, index) => (
              <button
                key={index}
                className={`join-item btn ${page === index + 1 ? 'btn-active' : ''}`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
