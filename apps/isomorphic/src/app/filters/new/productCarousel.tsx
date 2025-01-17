'use client';

import { PiCaretLeftBold, PiCaretRightBold } from 'react-icons/pi';
import { ActionIcon, Input, Title } from 'rizzui';
import cn from '@core/utils/class-names';
import { useDirection } from '@core/hooks/use-direction';
import { Navigation, Swiper, SwiperSlide } from '@core/ui/carousel/carousel';
import { generateSlug } from '@core/utils/generate-slug';
import { Product } from '@/types';
import ProductModernCard from './component/product-modern-card';
import { routes } from '@/config/routes';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

type ProductCarouselProps = {
  title: string;
  data: Product[];
  className?: string;
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
  showProduct: number;
  pinnedProd: any;
  setPinnedProducts: Dispatch<SetStateAction<number[]>>;
};

export default function ProductCarousel({
  title,
  data,
  showProduct,
  pinnedProd,
  setPinnedProducts,
  className,
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
}: ProductCarouselProps) {
  const { direction } = useDirection();

  const prevButtonClassName = `${generateSlug(title)}-prev-button`;
  const nextButtonClassName = `${generateSlug(title)}-next-button`;

  console.log(data, showProduct, 'data');

  const [searchQuery, setSearchQuery] = useState('');

  // Filter products based on the search query
  const filteredData = data.filter(
    (product: any) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const swiperRef = useRef<any>(null);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.swiper.update();
    }
  }, [showProduct]);

  return (
    <div className={cn('pt-0', className)}>
      <div className="mb-5 flex items-center justify-between">
        <Title as="h3" className="font-semibold">
          {title}
        </Title>

        {title !== 'Search Cards' && (
          <div className="flex items-start gap-4">
            <ActionIcon
              rounded="full"
              variant="outline"
              className={cn(
                'disabled:bg-gray-100 disabled:text-gray-300',
                prevButtonClassName
              )}
            >
              <PiCaretLeftBold className="h-auto w-5 rtl:rotate-180" />
            </ActionIcon>
            <ActionIcon
              rounded="full"
              variant="outline"
              className={cn(
                'recently-viewed-next-item disabled:bg-gray-100 disabled:text-gray-300',
                nextButtonClassName
              )}
            >
              <PiCaretRightBold className="h-auto w-5 rtl:rotate-180" />
            </ActionIcon>
          </div>
        )}
      </div>
      {title === 'Search Cards' && (
        <div className="py-2">
          <Input
            placeholder="search your category here"
            size="sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      )}
      {title === 'Search Cards' ? (
        <div className="mt-6 @container">
          <div className="grid grid-cols-1 gap-x-5 gap-y-6 @md:grid-cols-4 @xl:gap-x-7 @xl:gap-y-9">
            {filteredData.map((product) => (
              <div key={product.id}>
                <ProductModernCard
                  pinnedProd={pinnedProd}
                  setPinnedProducts={setPinnedProducts}
                  pageHeader={title}
                  product={product}
                  routes={routes}
                  bgColor={bgColor}
                  setBgColor={setBgColor}
                  textColor={textColor}
                  setTextColor={setTextColor}
                  imageSrc={imageSrc}
                  changeContentBgColor={changeContentBgColor}
                  contentTextColor={contentTextColor}
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                  selectedFont={selectedFont}
                  height={height}
                  borderRadius={borderRadius}
                  inputRadius={inputRadius}
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <Swiper
          ref={swiperRef}
          key={`recently-viewed-${direction}-${showProduct}`}
          dir={direction}
          slidesPerView={1}
          spaceBetween={10}
          modules={[Navigation]}
          navigation={{
            nextEl: `.${nextButtonClassName}`,
            prevEl: `.${prevButtonClassName}`,
          }}
          className="recently-viewed !-mx-1 !p-1"
          breakpoints={{
            // 375: {
            //   slidesPerView: 1,
            //   spaceBetween: 20,
            // },
            // 640: {
            //   slidesPerView: 3,
            //   spaceBetween: 20,
            // },
            // 768: {
            //   slidesPerView: 3,
            //   spaceBetween: 20,
            // },
            // 1024: {
            //   slidesPerView: 3,
            //   spaceBetween: 20,
            // },
            1440: {
              slidesPerView: showProduct,
              spaceBetween: 28,
            },
            1616: {
              slidesPerView: showProduct,
              spaceBetween: 28,
            },
          }}
        >
          {data.map((product) => (
            <SwiperSlide key={product.id}>
              <ProductModernCard
                pinnedProd={pinnedProd}
                setPinnedProducts={setPinnedProducts}
                pageHeader={title}
                product={product}
                routes={routes}
                bgColor={bgColor}
                setBgColor={setBgColor}
                textColor={textColor}
                setTextColor={setTextColor}
                imageSrc={imageSrc}
                changeContentBgColor={changeContentBgColor}
                contentTextColor={contentTextColor}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                selectedFont={selectedFont}
                height={height}
                borderRadius={borderRadius}
                inputRadius={inputRadius}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}
