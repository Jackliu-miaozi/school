// components/Sidebar.tsx
import Link from 'next/link';

const Sidebar = () => {
  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-gray-800 text-white">
      <div className="p-6">
        <h1 className="text-2xl font-bold">
          Dashboard
        </h1>
      </div>
      <nav className="px-6">
        <ul>
          <li className="mb-2">
            <Link
              href="/dashboard"
              className="block rounded px-4 py-2 hover:bg-gray-700"
            >
              首页
            </Link>
          </li>
          <li className="mb-2">
            <Link
              href="/settings"
              className="block rounded px-4 py-2 hover:bg-gray-700"
            >
              设置
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
