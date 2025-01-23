import { useRef } from 'react';
import { Navigation, Swiper, SwiperSlide } from '@core/ui/carousel/carousel';
import { generateSlug } from '@core/utils/generate-slug';
import { useDirection } from '@core/hooks/use-direction';
import { ActionIcon, Button, Text, Title } from 'rizzui';
import { PiCaretLeftBold, PiCaretRightBold } from 'react-icons/pi';
import cn from '@core/utils/class-names';
import { FaArrowLeft } from 'react-icons/fa';
import Image from 'next/image';
import svg from '@public/address.svg';
import ng from '@public/newsletter-1.svg';
import { toCurrency } from '@core/utils/to-currency';

const mockProducts = [
  { id: 1, name: 'Citrus & Sage Candle', price: 295, image: svg },
  { id: 2, name: 'French Vanilla Candle', price: 320, image: ng },
  { id: 3, name: 'Citrus Fragrance', price: 250, image: svg },
  { id: 4, name: 'Perfume Trio Set', price: 750, image: ng },
  { id: 5, name: 'Love Constellation Set', price: 1200, image: svg },
];

const Carousel = ({ message }: { message: any }) => {
  const { direction } = useDirection();

  const prevButtonClassName = `${generateSlug('abc')}-prev-button`;
  const nextButtonClassName = `${generateSlug('abc')}-next-button`;

  console.log(message?.text?.response, message?.text?.results, 'message');

  return (
    <div className="flex flex-col gap-4">
      <div
        className="prose prose-sm prose-li:space-y-2 mb-4 rounded-md bg-gray-50 p-2"
        dangerouslySetInnerHTML={{
          __html: message?.text?.response
            .replace(/\n\s*\n/g, '<br/><br/>')
            .replace(/\n/g, '<br/>'),
        }}
      />

      <div className="relative mx-auto w-full">
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
          spaceBetween={60}
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
                <div className="flex h-full max-h-[300px] min-h-[300px] w-[220px] flex-col rounded-2xl border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800">
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
                      <Button
                        size="sm"
                        className="w-[96px]"
                        rounded="pill"
                        variant="solid"
                        color="primary"
                      >
                        Add to cart
                      </Button>
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
