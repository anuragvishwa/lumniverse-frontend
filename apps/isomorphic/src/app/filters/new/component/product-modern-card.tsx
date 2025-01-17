'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Title, Text, Button } from 'rizzui';
import cn from '@core/utils/class-names';
import { generateSlug } from '@core/utils/generate-slug';
import { Product } from '@/types';
import { toCurrency } from '@core/utils/to-currency';
import { Dispatch, SetStateAction, useState } from 'react';
import { BsPin, BsPinAngle } from 'react-icons/bs';
import noImage from '@public/no-image-svgrepo-com.svg';

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
  pinnedProd: any;
  setPinnedProducts: Dispatch<SetStateAction<number[]>>;
}

export default function ProductModernCard({
  product,
  pageHeader,
  pinnedProd,
  setPinnedProducts,
  className,
  routes,
  bgColor,
  setBgColor,
  inputRadius,
  textColor,
  setTextColor,
  imageSrc,
  contentTextColor,
  changeContentBgColor,
  isOpen,
  setIsOpen,
  selectedFont,
  height,
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

  const handlePinProduct = (id: number) => {
    if (pinnedProd.includes(id)) {
      // If already pinned, unpin it
      setPinnedProducts((prev) => prev.filter((productId) => productId !== id));
    } else if (pinnedProd.length < 7) {
      // If not pinned and under the limit, pin it
      setPinnedProducts((prev) => [...prev, id]);
    } else {
      alert('You can only pin up to 7 products.');
    }
  };
  console.log(thumbnail, 'thumbnail');
  return (
    <div
      className={cn(className)}
      style={{ fontFamily: selectedFont, color: textColor }}
    >
      <div className="relative">
        <div className="relative mx-auto aspect-[4/5.06] w-full overflow-hidden rounded-lg bg-gray-100">
          <Image
            alt={title}
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAYAAAA5ZDbSAAAFQElEQVR4Ae2cy2sTURjFP6Wp2Ep9tMSqqFRtKjaFpgsDPkAK4gN8bAS3/mVu3epG3RSKD8imKZgW0/oAFazF1iq1SiIo3+gNd8aZTmxqvfd4ZpOZO5PJnPPLuc+0m5ZXvn4XbrAObIZVRmGBAwQM/kUgYAIGdwBcHhNMwOAOgMtjggkY3AFweUwwAYM7AC6PCSZgcAfA5THBBAzuALg8JpiAwR0Al8cEEzC4A+DymGACBncAXB4TTMDgDoDLY4IJGNwBcHlMMAGDOwAujwkmYHAHwOUxwQQM7gC4PCaYgMEdAJfHBBMwuAPg8phgAgZ3AFweE0zA4A6Ay2OCwQG3ua7v2ctXUpqYklq97tSjbuvskEI+J0f6Djj1XNGHcT7B5cqMc3DVxOXPK8EXL2qoa8fOA1YjXd1cq1XifHIecNxDs6x5B5xvg6NSbly/HC3a0OObt+5s6Oe1+mFMcKsOOv5+AnYcUKuPR8CtOuj4+71rg9P81J7tdPW5zM0vyNv5heDy7p3b5Viuz/kxa5q2tZyHAqxDqrtjj4Mxqm3GwoeP8qA0KTqmvjB6QnSS4n/ZoKroOLg2SPMFqDs2K2Y/43rvwwDWKc1mJkX0mkr1+Xr76Oz9YKroqeqLkMn9ffulOJKXWq0u5UpVZl++bpx/96ttbhQA78AkeHHpUwhTIT8gmUxGOjs75HghHzpnOl+hQtADGMBRPu3tmUaRD3PGjYdd5x0YwHuy3SFrShOVoE1WuJOVaujcrh1doWPkA5g2eHe2pzHuVWDa5trtrg1xcOCQfRjsm3VnTf7gQJ8cyx3+7RofC2ASPJg7JNs6t6Yy0Guii/QKV8fJmnbtZesPDCYrT1Pv5cMFMIA1eRdHT64KWeHqNfZm4Npluq+TIvfGHjU19Iq+16VjGMBqqvaYr106K6eLw2K3s73ZbhnOD8jV82eCawyAJLjmvPa20yZPzLWuvsK0wbbBWgVHq2H7vO4nwdWUL3/+0rhcq+zb98alMJTzsl2GBNygk7CTBPdUcVj2ZnvkQakc6rBp2xz88K/m1g//EuSFimEA6wqStptpveDV4Pb/+oXk+dGTwexXdHil9/dt8x7w3Px7KZWnZPHDx8B7k7ZXb+bkVLEQWjlqBq4BqDNhW9rbpPykKrX6N1Ps3au3nSwF+bBUDjpBBq7tvnaQtO2cnvm5sPAncM19dCysHbNmhl/mPa69eplgUx0r5NU2k+bZF29kcelnwu3rtc011bJdbu9rz1yHVtF22b7G5X3vEnz7/nhQJcfB1RWk6JSlmr9WuAacQtZ2WYdavm3eJTiuOt61s0uKhbz0ZnsC/7VaXq3tbCa5cSC1XY52vOKuc6nMO8C2ee2ZNhkeOio6TWlv2nYe3LcntlpdK1z7/j7tewvYLOjrmm/cZqpVTbP+GEAX/o+P5FPb3Lh7+VzmHeBodZxmvqYZZWUoTWvcee8AXzl3Jk4HyxIc8K4XnaCDxQkOEHCCMSjFBIxCMkEHAScYg1LsXSfLt7/P/ddfFCb4XxP4y5/vPGCdrXJ182GVyXnA+ucnLhoZTJN6sPiwaXnl63dXE8Lnat0B5xPcusT/+w4EDM6fgAkY3AFweUwwAYM7AC6PCSZgcAfA5THBBAzuALg8JpiAwR0Al8cEEzC4A+DymGACBncAXB4TTMDgDoDLY4IJGNwBcHlMMAGDOwAujwkmYHAHwOUxwQQM7gC4PCaYgMEdAJfHBBMwuAPg8phgAgZ3AFweE0zA4A6Ay2OCCRjcAXB5TDABgzsALs/d/zK2scbD/iupH1rBeN3SxccUAAAAAElFTkSuQmCC"
            fill
            priority
            quality={90}
            sizes="(max-width: 768px) 100vw"
            className="h-full w-full object-cover"
          />
        </div>
        {pinnedProd.includes(product.id) && (
          <BsPinAngle className="absolute end-3 top-3 text-gray-900" />
        )}
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
        {/* {pinnedProd.includes(product.id) && (
          <div className="font-semibold text-green-600">Pinned</div>
        )} */}
        {/* {colors?.length ? <ColorSwatch colors={product?.colors} /> : null} */}
      </div>
    </div>
  );
}
