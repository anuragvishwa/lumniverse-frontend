'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Title, Text, Button } from 'rizzui';
import cn from '@core/utils/class-names';
import WishlistButton from '@core/components/wishlist-button';
import { generateSlug } from '@core/utils/generate-slug';
import { Product } from '@/types';
import { toCurrency } from '@core/utils/to-currency';
import { Dispatch, SetStateAction, useState } from 'react';

interface ProductProps {
  product: Product;
  className?: string;
  routes: any;
  inputRadius: string;
  bgColor: string;
  setBgColor: Dispatch<SetStateAction<string>>;
  textColor: string;
  setTextColor: Dispatch<SetStateAction<string>>;
  changeContentBgColor: string;
  imageSrc: string;
  contentTextColor: string;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  selectedFont: string;
  height: string;
  borderRadius: string;
  pageHeader: string;
}

export default function ProductModernCard({
  product,
  pageHeader,
  className,
  routes,
  bgColor,
  textColor,
  selectedFont,
  borderRadius,
}: ProductProps) {
  const {
    title,
    thumbnail,
    slug,
    description,
    price,
    sale_price,
    colors = [],
  } = product;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={cn(className)}
      style={{ fontFamily: selectedFont, color: textColor }}
    >
      <div className="relative">
        <div className="relative mx-auto aspect-[4/5.06] w-full overflow-hidden rounded-lg bg-gray-100">
          <Image
            alt={title}
            src={thumbnail}
            fill
            priority
            quality={90}
            sizes="(max-width: 768px) 100vw"
            className="h-full w-full object-cover"
          />
        </div>
        <WishlistButton className="absolute end-3 top-3" />
      </div>

      <div className="pt-3">
        <Link
          href={routes.eCommerce.productDetails(
            String(slug ?? generateSlug(title))
          )}
        >
          <Title
            style={{ fontFamily: selectedFont, color: textColor }}
            as="h6"
            className="mb-1 truncate font-semibold transition-colors hover:text-primary"
          >
            {title}
          </Title>
        </Link>

        <Text
          as="p"
          className="truncate"
          style={{ fontFamily: selectedFont, color: textColor }}
        >
          {description}
        </Text>
        <div
          className="mt-2 flex items-center font-semibold text-gray-900"
          style={{ fontFamily: selectedFont, color: textColor }}
        >
          {toCurrency(Number(price))}
          {sale_price && (
            <del className="ps-1.5 text-[13px] font-normal text-gray-500">
              {toCurrency(Number(sale_price))}
            </del>
          )}
        </div>
        {pageHeader === 'Personalize Cards' && (
          <Button
            className={`${
              bgColor.startsWith('bg-') ? bgColor : ''
            } mt-2 w-full text-sm font-bold text-white transition duration-300 ease-in-out rounded-${borderRadius}`}
            style={{
              backgroundColor: !bgColor.startsWith('bg-') ? bgColor : '',
            }}
          >
            Add to Card
          </Button>
        )}

        {/* {colors?.length ? <ColorSwatch colors={product?.colors} /> : null} */}
      </div>
    </div>
  );
}
