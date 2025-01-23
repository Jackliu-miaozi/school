'use client';

import { Suspense } from 'react';
export default function RecentActivity() {
  return (
    <div className="rounded-lg bg-white p-6 shadow-lg">
      <h2 className="mb-2 text-lg font-semibold text-gray-800">最近活动</h2>
      <Suspense fallback={<p>加载中...</p>}>
        <p className="text-3xl font-bold text-green-600">
          {new Date().toLocaleDateString()}
        </p>
      </Suspense>
    </div>
  );
}
