'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FiSave } from 'react-icons/fi';
import { Button } from 'rizzui';
import cn from '@core/utils/class-names';
import { useMedia } from '@core/hooks/use-media';
import { siteConfig } from '@/config/site.config';
import StickyHeader from '@/layouts/sticky-header';
import Logo from '@core/components/logo';
import HamburgerButton from '@/layouts/hamburger-button';
import Sidebar from '@/layouts/hydrogen/sidebar';
import SimpleBar from 'simplebar-react';
import { SidebarMenu } from '@/layouts/hydrogen/sidebar-menu';

interface FooterProps {
  className?: string;
}

export default function Header({ className }: FooterProps) {
  const isMobile = useMedia('(max-width: 767px)', false);
  return (
    <header
      className={cn(
        'flex w-full items-center justify-between px-4 py-5 md:h-20 md:px-5 lg:px-8 4xl:px-10',
        className
      )}
    >
      <aside className={cn('bg-white dark:bg-gray-100/50 2xl:w-72', className)}>
        <div className="sticky top-0 z-40 bg-gray-0/10 px-6 pb-5 pt-5 dark:bg-gray-100/5 2xl:px-8 2xl:pt-6">
          <Link
            href={'/'}
            aria-label="Site Logo"
            className="text-gray-800 hover:text-gray-900"
          >
            <Logo className="max-w-[155px]" />
          </Link>
        </div>
      </aside>
      <div className="flex items-center gap-2">
        <Button
          variant="text"
          className="text-gray-900 hover:enabled:text-gray-700"
        >
          Questions?
        </Button>
        <Button
          rounded="pill"
          variant="outline"
          className="text-gray-00 gap-2 whitespace-nowrap border-white hover:border-gray-900 hover:bg-white hover:text-black"
        >
          <FiSave className="h-4 w-4" />
          Save & Exit
        </Button>
      </div>
    </header>
  );
}
