'use client';

import POSProductCategory from '@/app/shared/point-of-sale/pos-product-category';
import POSProductsFeed from '@/app/shared/point-of-sale/pos-product-feed';
import PostSidebar from './pos-sidebar';
import { useCart } from '@/store/quick-cart/cart.context';
import cn from '@core/utils/class-names';

export default function POSPageView() {
  const { items, removeItemFromCart, clearItemFromCart } = useCart();

  return (
    <div className="grid grid-cols-12 gap-6 pb-10 @container xl:min-h-[745px]">
      <div
        className={cn(
          'col-span-full',
          !!items?.length && 'xl:col-span-8 2xl:col-span-9'
        )}
      >
        <POSProductsFeed />
      </div>
    </div>
  );
}
