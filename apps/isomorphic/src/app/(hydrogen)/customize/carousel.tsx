import { useRef } from 'react';
import { Navigation, Swiper, SwiperSlide } from '@core/ui/carousel/carousel';
import { generateSlug } from '@core/utils/generate-slug';
import { useDirection } from '@core/hooks/use-direction';
import { ActionIcon, Button } from 'rizzui';
import { PiCaretLeftBold, PiCaretRightBold } from 'react-icons/pi';
import cn from '@core/utils/class-names';
import { FaArrowLeft } from 'react-icons/fa';
import Image from 'next/image';
import svg from '@public/address.svg';
import ng from '@public/newsletter-1.svg';

const mockProducts = [
  { id: 1, name: 'Citrus & Sage Candle', price: 295, image: svg },
  { id: 2, name: 'French Vanilla Candle', price: 320, image: ng },
  { id: 3, name: 'Citrus Fragrance', price: 250, image: svg },
  { id: 4, name: 'Perfume Trio Set', price: 750, image: ng },
  { id: 5, name: 'Love Constellation Set', price: 1200, image: svg },
];

const Carousel = () => {
  const { direction } = useDirection();

  const prevButtonClassName = `${generateSlug('abc')}-prev-button`;
  const nextButtonClassName = `${generateSlug('abc')}-next-button`;

  return (
    <div className="relative mx-auto w-full max-w-4xl">
      {/* Absolute positioning container for navigation buttons */}
      <div className="absolute left-2 top-1/2 z-[9999] -translate-y-1/2">
        <ActionIcon
          rounded="full"
          variant="outline"
          className={cn(
            'cursor-pointer bg-white text-gray-900 shadow-lg',
            prevButtonClassName
          )}
        >
          <PiCaretLeftBold className="h-auto w-5 rtl:rotate-180" />
        </ActionIcon>
      </div>
      <div className="absolute right-2 top-1/2 z-[9999] -translate-y-1/2">
        <ActionIcon
          rounded="full"
          variant="outline"
          className={cn(
            'cursor-pointer bg-white text-gray-900 shadow-lg',
            nextButtonClassName
          )}
        >
          <PiCaretRightBold className="h-auto w-5 rtl:rotate-180" />
        </ActionIcon>
      </div>

      <Swiper
        key={`recently-viewed-${direction}`}
        dir={direction}
        slidesPerView={1.5}
        spaceBetween={10}
        modules={[Navigation]}
        navigation={{
          nextEl: `.${nextButtonClassName}`,
          prevEl: `.${prevButtonClassName}`,
        }}
        className="recently-viewed !-mx-1 !p-1"
      >
        {mockProducts.map((product) => (
          <SwiperSlide key={product.id}>
            <div className="mx-auto h-80 max-w-xs rounded-lg border p-4 shadow-md">
              <div className="flex h-40 items-center justify-center overflow-hidden rounded-lg bg-gray-100">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={300}
                  height={200}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="mt-4 text-center">
                <h2 className="text-sm font-semibold">{product.name}</h2>
                <p className="text-gray-500">Rs.{product.price}</p>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <Button size="md" variant="outline" className="flex-1">
                  View Product
                </Button>
                <ActionIcon size="md" variant="outline" className="ml-2">
                  <FaArrowLeft />
                </ActionIcon>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;
