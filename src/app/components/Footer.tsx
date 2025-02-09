'use client';

import React from 'react';
import Link from 'next/link';

const Footer = () => {
  const footerLinks = {
    'GET STARTED': {
      'DOT Token': '#',
      'Polkadot Wallets': '#',
      Staking: '#',
      Dapps: '#',
    },
    PLATFORM: {
      'Polkadot SDK': '#',
      'Polkadot Chain': '#',
      'Polkadot DAO': '#',
      'Case Studies': '#',
      'Use Cases': '#',
      Papers: '#',
    },
    DEVELOPERS: {
      'Grants & Funding': '#',
      Courses: '#',
      Documentation: '#',
      'Alpha Program': '#',
      'Blockchain Academy': '#',
      'Parity Bug Bounty': '#',
      'Bridges Bug Bounty': '#',
    },
    COMMUNITY: {
      About: '#',
      Blog: '#',
      Newsroom: '#',
      'Decentralized Jobs': '#',
      'Ambassador Program': '#',
      Events: '#',
      Contact: '#',
      'Brand Hub': '#',
    },
    LEGAL: {
      'Legal Disclosures': '#',
      'Privacy Policy': '#',
      'Cookie Policy': '#',
      'Sweepstakes Terms & Conditions': '#',
    },
  };

  return (
    <footer className="bg-white px-6 py-12">
      <div className="mx-auto max-w-7xl">
        {/* 导航链接区域 */}
        <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-5">
          {Object.entries(footerLinks).map(
            ([category, links]) => (
              <div key={category}>
                <h3 className="mb-4 font-semibold">
                  {category}
                </h3>
                <ul className="space-y-2">
                  {Object.entries(links).map(
                    ([label, href]) => (
                      <li key={label}>
                        <Link
                          href={href}
                          className="text-gray-600 hover:text-gray-900"
                        >
                          {label}
                        </Link>
                      </li>
                    ),
                  )}
                </ul>
              </div>
            ),
          )}
        </div>

        {/* 底部区域 */}
        <div className="flex flex-col items-center justify-between border-t pt-8 md:flex-row">
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className="text-2xl font-bold"
            >
              Polkadot
            </Link>
            <span className="text-gray-500">
              © 2025
            </span>
          </div>

          {/* 社交媒体链接 */}
          <div className="mt-4 flex space-x-6 md:mt-0">
            {[
              'discord',
              'reddit',
              'github',
              'youtube',
              'twitter',
              'instagram',
            ].map((social) => (
              <Link
                key={social}
                href={`#${social}`}
                className="text-gray-500 hover:text-gray-900"
              >
                <span className="sr-only">
                  {social}
                </span>
                {/* 这里可以添加社交媒体图标 */}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
