'use client';

import { useState } from 'react';
import { Empty, SearchNotFoundIcon, Button } from 'rizzui';
import ProductClassicCard from '@core/components/cards/product-classic-card';
import { posFilterValue } from '@/app/shared/point-of-sale/pos-search';
import { useAtomValue } from 'jotai';

import hasSearchedParams from '@core/utils/has-searched-params';
import shuffle from 'lodash/shuffle';
import CreateCategoryModalView from '../sales/learn-modal';
import { useModal } from '@/app/shared/modal-views/use-modal';

const PER_PAGE = 12;

export default function POSProductsFeed({ posData }: { posData: any }) {
  const [isLoading, setLoading] = useState(false);
  const [nextPage, setNextPage] = useState(PER_PAGE);
  const searchText = useAtomValue(posFilterValue);

  let productItemsFiltered = [...posData].sort((a, b) =>
    (a.name || '').localeCompare(b.name || '')
  );

  if (searchText.length > 0) {
    productItemsFiltered = posData.filter((item: any) => {
      const label = item.name;
      return (
        label.match(searchText.toLowerCase()) ||
        (label.toLowerCase().match(searchText.toLowerCase()) && label)
      );
    });
  }

  productItemsFiltered = hasSearchedParams()
    ? shuffle(productItemsFiltered)
    : productItemsFiltered;

  function handleLoadMore() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setNextPage(nextPage + PER_PAGE);
    }, 600);
  }
  const { openModal } = useModal();
  return (
    <>
      {productItemsFiltered?.length ? (
        <div className="grid grid-cols-2 gap-x-4 gap-y-6 @md:grid-cols-[repeat(auto-fill,minmax(210px,1fr))] @xl:gap-x-6 @xl:gap-y-12 @4xl:grid-cols-[repeat(auto-fill,minmax(270px,1fr))]">
          {posData.map((card: any) => (
            <div
              className="card col-span-full rounded-md border p-4 sm:col-span-1"
              key={card.id}
            >
              <div className="card-details relative mb-4">
                <p className="absolute left-6 top-4">
                  <span className="text-body flex items-center gap-1">
                    {card.icon} {card.category}
                  </span>
                </p>
                <p className="text-title mt-10">{card.title}</p>
                <p className="text-body mt-2">{card.description}</p>
              </div>
              <button
                className="card-button rounded bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
                onClick={() => {
                  openModal({
                    view: <CreateCategoryModalView />,
                    customSize: '720px',
                  });
                }}
              >
                Learn More
              </button>
            </div>
          ))}
        </div>
      ) : (
        <Empty
          image={<SearchNotFoundIcon />}
          text="No Result Found"
          className="h-full justify-center"
        />
      )}

      {nextPage < productItemsFiltered?.length ? (
        <div className="mb-4 mt-5 flex flex-col items-center xs:pt-6 sm:pt-8">
          <Button isLoading={isLoading} onClick={() => handleLoadMore()}>
            Load More
          </Button>
        </div>
      ) : null}
    </>
  );
}
