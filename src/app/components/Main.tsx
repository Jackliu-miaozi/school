'use client';

export default function Main() {
  return (
    <main className="h-screen bg-gradient-to-b from-[#adff73] to-[#e9eaff] p-8 text-white">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-6 text-4xl font-bold">
          欢迎来到我的网站
        </h1>

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold">
            关于我们
          </h2>
          <p className="text-gray-600">
            这里是网站的简介内容。您可以在这里介绍您的网站、产品或服务。
          </p>
        </section>

        <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* 特色内容卡片 */}
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h3 className="mb-2 text-xl font-semibold">
              特色功能一
            </h3>
            <p className="text-gray-600">
              描述您的第一个主要特色或服务。
            </p>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-md">
            <h3 className="mb-2 text-xl font-semibold">
              特色功能二
            </h3>
            <p className="text-gray-600">
              描述您的第二个主要特色或服务。
            </p>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-md">
            <h3 className="mb-2 text-xl font-semibold">
              特色功能三
            </h3>
            <p className="text-gray-600">
              描述您的第三个主要特色或服务。
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
