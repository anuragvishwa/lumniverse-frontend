// pages/products.tsx
import { useState } from 'react';

const Products = () => {
  const [selectedVendor, setSelectedVendor] = useState<string[]>([]);

  // Dummy data for vendors and products
  const vendors = [
    'Adidas',
    'Aldo',
    'Alexander McQueen',
    'Burberry',
    'Cartier',
  ];
  const products = [
    {
      name: '100% Leather Jacket',
      price: '$20.00',
      imgUrl: 'https://via.placeholder.com/150',
      isSoldOut: true,
    },
    {
      name: 'Autumn Women Shirt',
      price: '$7.00',
      imgUrl: 'https://via.placeholder.com/150',
    },
    {
      name: 'Best Black T-Shirt',
      price: '$6.00',
      imgUrl: 'https://via.placeholder.com/150',
    },
    {
      name: 'Black Boy Hat',
      price: '$5.00',
      oldPrice: '$20.00',
      isOnSale: true,
      imgUrl: 'https://via.placeholder.com/150',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="mb-6 text-4xl font-bold">Products</h1>

      <div className="flex space-x-6">
        {/* Sidebar */}
        <div className="w-1/4 rounded bg-white p-4 shadow">
          <h2 className="mb-4 text-lg font-semibold">Filter by</h2>

          {/* Vendor Filter */}
          <div className="mb-6">
            <h3 className="text-md mb-2 font-semibold">Vendor</h3>
            <ul>
              {vendors.map((vendor, index) => (
                <li key={index} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`vendor-${index}`}
                    className="mr-2"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedVendor([...selectedVendor, vendor]);
                      } else {
                        setSelectedVendor(
                          selectedVendor.filter((v) => v !== vendor)
                        );
                      }
                    }}
                  />
                  <label htmlFor={`vendor-${index}`}>{vendor}</label>
                </li>
              ))}
            </ul>
          </div>

          {/* Product Type Filter */}
          <div>
            <h3 className="text-md mb-2 font-semibold">Product Type</h3>
            <ul>
              <li>
                <input type="checkbox" id="type1" className="mr-2" />
                <label htmlFor="type1">Accessories</label>
              </li>
              <li>
                <input type="checkbox" id="type2" className="mr-2" />
                <label htmlFor="type2">Dresses</label>
              </li>
              <li>
                <input type="checkbox" id="type3" className="mr-2" />
                <label htmlFor="type3">Jackets</label>
              </li>
            </ul>
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-4 gap-6">
            {products.map((product, index) => (
              <div
                key={index}
                className="rounded bg-white p-4 shadow transition hover:shadow-lg"
              >
                <img
                  src={product.imgUrl}
                  alt={product.name}
                  className="mb-4 h-48 w-full object-cover"
                />
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-500">{product.price}</p>
                {product.isSoldOut && (
                  <span className="text-red-500">Sold Out</span>
                )}
                {product.isOnSale && (
                  <span className="text-red-500">On Sale</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
