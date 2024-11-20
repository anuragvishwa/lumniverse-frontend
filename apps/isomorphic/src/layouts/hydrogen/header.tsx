'use client';

import Link from 'next/link';
import HamburgerButton from '@/layouts/hamburger-button';
import Sidebar from '@/layouts/hydrogen/sidebar';
import Logo from '@core/components/logo';
import HeaderMenuRight from '@/layouts/header-menu-right';
import StickyHeader from '@/layouts/sticky-header';
import SearchWidget from '@/app/shared/search/search';

export default function Header() {
  return (
    <StickyHeader className="z-[990] 2xl:py-5 3xl:px-8 4xl:px-10">
      <div className="flex w-full max-w-2xl items-center">
        <HamburgerButton
          view={<Sidebar className="static w-full 2xl:w-full" />}
        />
        <Link
          href={'/'}
          aria-label="Site Logo"
          className="me-2 w-9 shrink-0 text-gray-800 hover:text-gray-900 lg:me-5 xl:hidden"
        >
          {/* <Logo iconOnly={true} /> */}
          <svg
            width="150"
            height="50"
            viewBox="0 0 370.00000000000006 69.92222340901692"
            className="looka-1j8o68f"
          >
            <defs id="SvgjsDefs1608"></defs>
            <g
              id="SvgjsG1609"
              transform="matrix(0.7777777777777778,0,0,0.7777777777777778,-3.8888881471421985,-3.888888888888889)"
              fill="black"
            >
              <g xmlns="http://www.w3.org/2000/svg">
                <path d="M78.4,66.5c-5.5,4.8-9.9,15.2-9.9,15.2s-6.9-11.4-12.9-15.3c-9.5-6.1-13.6-6.2-13.6-6.2V65c0,0,7.8,1.2,11.7,4.6   c8.2,7.1,14.8,18.5,14.8,18.5S74.4,75,80.1,70.5C88.1,64.3,95,65,95,65v-4.8C95,60.1,85.1,60.7,78.4,66.5z"></path>
                <path d="M42,80c-6.4-3.6-17.8-4.3-17.8-4.3s8.7-10.1,10.5-17C37.5,47.9,36.2,44,36.2,44l-4.6,1.6c0,0,1.3,7.7-0.6,12.4   c-4.1,9.9-13,19.8-13,19.8s14.6,1.3,20.7,5.1c8.6,5.4,10.2,12,10.2,12l4.6-1.6C53.5,93.4,49.7,84.4,42,80z"></path>
                <path d="M35.3,36.8c11.3-0.9,14.6-3.4,14.6-3.4l-3-3.8c0,0-6.9,3.7-12.1,3.4c-10.9-0.6-23.3-5.6-23.3-5.6s3.5,14,1.8,20.9   C10.9,58.2,5,61.8,5,61.8l3,3.8c0,0,7.5-6.5,9.1-15.1c1.3-7.1-1.7-18-1.7-18S28,37.4,35.3,36.8z"></path>
                <path d="M37.4,17.8c7.3-1.1,16.7-7.4,16.7-7.4s-0.6,13.2,2.4,19.8c4.6,10.2,8,12.5,8,12.5l2.7-4c0,0-5.9-5.2-7.3-10.2   C56.9,18.2,57.7,5,57.7,5s-12.3,7.8-19.5,8.5c-10.2,1-15.6-3.3-15.6-3.3l-2.7,4.1C19.9,14.2,28.6,19.1,37.4,17.8z"></path>
                <path d="M65,60.5c0,0,3.1-7.2,7.4-10.1c9-6.1,21.9-9.7,21.9-9.7s-11.5-8.9-14.5-15.4c-4.2-9.1-1.9-15.6-1.9-15.6l-4.8-1.2   c0,0-1.9,9.6,2.2,17.4c3.4,6.4,12.5,13.2,12.5,13.2S75,42.9,69.6,47.8c-8.3,7.6-9.4,11.5-9.4,11.5L65,60.5z"></path>
              </g>
            </g>
          </svg>
        </Link>

        <SearchWidget />
      </div>

      <HeaderMenuRight />
    </StickyHeader>
  );
}
