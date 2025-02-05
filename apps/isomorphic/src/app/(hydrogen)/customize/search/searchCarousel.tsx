import { SetStateAction, useState } from 'react';
import { Navigation, Swiper, SwiperSlide } from '@core/ui/carousel/carousel';
import { generateSlug } from '@core/utils/generate-slug';
import { useDirection } from '@core/hooks/use-direction';
import { ActionIcon, Button, Text } from 'rizzui';
import { PiCaretLeftBold, PiCaretRightBold } from 'react-icons/pi';
import cn from '@core/utils/class-names';
import { FaShoppingCart } from 'react-icons/fa';
import Image from 'next/image';
import { toCurrency } from '@core/utils/to-currency';
import { IoArrowUndoOutline } from 'react-icons/io5';
import { BsX } from 'react-icons/bs';
import { Dispatch } from '@reduxjs/toolkit';

const message = {
  text: {
    response: 'Here are some recommended products',
    results: [
      {
        id: 1,
        image: '/images/product1.jpg',
        title: 'Product One',
        description:
          "This is a description for product one. It's a great product.",
        price: '29.99',
      },
      {
        id: 2,
        image: '/images/product2.jpg',
        title: 'Product Two',
        description: "This is a description for product two. It's even better.",
        price: '39.99',
      },
      {
        id: 3,
        image: '/images/product3.jpg',
        title: 'Product Three',
        description:
          'This is a description for product three. You will love it.',
        price: '49.99',
      },
      {
        id: 4,
        image: '/images/product4.jpg',
        title: 'Product Four',
        description:
          'This is a description for product four. The best one yet.',
        price: '59.99',
      },
    ],
  },
};

const Carousel = () => {
  const { direction } = useDirection();

  const prevButtonClassName = `${generateSlug('abc')}-prev-button`;
  const nextButtonClassName = `${generateSlug('abc')}-next-button`;

  return (
    <div className="flex flex-col gap-4">
      {/* <div
        className="prose prose-sm prose-li:space-y-2 mb-4 rounded-md bg-gray-50 p-2"
        dangerouslySetInnerHTML={{
          __html: message?.text?.response
            .replace(/\n\s*\n/g, '<br/><br/>')
            .replace(/\n/g, '<br/>'),
        }}
      /> */}

      <div className="relative mx-auto w-full">
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
          {message?.text?.results.map((product: any) => (
            <SwiperSlide key={product.id}>
              <div className={cn('pb-0.5')}>
                <div className="flex h-full max-h-[300px] min-h-[300px] flex-col rounded-2xl border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800">
                  <div className="relative aspect-square w-full overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      priority
                      quality={90}
                      sizes="(max-width: 768px) 100vw"
                      className="h-full w-full rounded-2xl object-cover"
                    />
                  </div>

                  <div className="flex flex-grow flex-col justify-between rounded-b-2xl bg-gray-100 p-3">
                    <div>
                      <Text
                        as="p"
                        className="mb-1 truncate font-inter text-sm font-semibold text-gray-900"
                      >
                        {product.title}
                      </Text>
                      <Text
                        as="p"
                        className="max-h-12 overflow-hidden text-ellipsis text-xs leading-4"
                        style={{
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                        }}
                      >
                        {product.description}
                      </Text>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="text-xs font-semibold text-gray-500">
                        {toCurrency(Number(product.price))}
                      </div>
                      <div className="flex items-center gap-1">
                        <ActionIcon size="sm" variant="solid" color="primary">
                          <FaShoppingCart />
                        </ActionIcon>
                        <ActionIcon size="sm" variant="solid" color="primary">
                          <IoArrowUndoOutline />
                        </ActionIcon>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Carousel;
