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
import { useCart } from '@/store/quick-cart/cart.context';

const mockProducts = [
  { id: 1, name: 'Citrus & Sage Candle', price: 295, image: svg },
  { id: 2, name: 'French Vanilla Candle', price: 320, image: ng },
  { id: 3, name: 'Citrus Fragrance', price: 250, image: svg },
  { id: 4, name: 'Perfume Trio Set', price: 750, image: ng },
  { id: 5, name: 'Love Constellation Set', price: 1200, image: svg },
];

const Carousel = ({ message }: { message: any }) => {
  const { direction } = useDirection();
  const { addItemToCart, isInCart } = useCart();

  const prevButtonClassName = `${generateSlug('abc')}-prev-button`;
  const nextButtonClassName = `${generateSlug('abc')}-next-button`;

  console.log(message?.text?.response, message?.text?.results, 'message');

  return (
    <div className="flex flex-col gap-4">
      <div
        className="prose prose-sm prose-ul:pl-5 prose-li:space-y-2 mb-4"
        dangerouslySetInnerHTML={{ __html: message?.text?.response }}
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
              {/* <div className="mx-auto h-80 max-w-xs rounded-lg border p-4 shadow-md">
                <div className="flex h-40 items-center justify-center overflow-hidden rounded-lg bg-gray-100">
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={300}
                    height={200}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="mt-4 text-center">
                  <h2 className="text-sm font-semibold">{product.title}</h2>
                  <p className="text-gray-500">Rs.{product.price}</p>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <Button size="sm" variant="outline" className="flex-1">
                    View Product
                  </Button>
                  <ActionIcon size="sm" variant="outline" className="ml-2">
                    <FaArrowLeft />
                  </ActionIcon>
                </div>
              </div> */}

              <div className={cn('pb-0.5')}>
                <div className="relative">
                  <div className="relative mx-auto aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      priority
                      quality={90}
                      sizes="(max-width: 768px) 100vw"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  {/* {discount ? (
                    <Text
                      as="span"
                      className="absolute start-5 top-5 rounded-lg bg-white px-2.5 py-1.5 text-xs font-semibold dark:bg-gray-200 dark:text-gray-700"
                    >
                      {discount}% Discount
                    </Text>
                  ) : null} */}
                </div>

                <div className="pt-3">
                  <Title
                    as="h6"
                    className="mb-1 truncate font-inter font-semibold"
                  >
                    {product.title}
                  </Title>

                  <Text as="p" className="truncate">
                    {product.description}
                  </Text>
                  <div className="mt-2 flex items-center font-semibold text-gray-900">
                    {toCurrency(Number(product.price))}
                    {/* {price && (
                      <del className="ps-1.5 text-[13px] font-normal text-gray-500">
                        {toCurrency(Number(price))}
                      </del>
                    )} */}
                  </div>
                  <div className="mt-3">
                    <Button
                      onClick={() => addItemToCart(product, 1)}
                      className="w-full"
                      variant="outline"
                    >
                      Add to cart
                    </Button>
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
