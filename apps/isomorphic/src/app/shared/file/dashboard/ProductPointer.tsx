import CheckCircleIcon from '@core/components/icons/check-circle';
import { useState } from 'react';
import { BsArrowRight, BsX } from 'react-icons/bs';
import { FiMessageCircle } from 'react-icons/fi';
import { HiSparkles } from 'react-icons/hi2';

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
}

const products: Product[] = [
  { id: 1, name: 'Grey Cap', price: '$26.00', image: '/grey-cap.png' },
  { id: 2, name: 'Red Cap', price: '$28.00', image: '/red-cap.png' },
];

export default function ProductPointer() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [question, setQuestion] = useState('');
  const [showChat, setShowChat] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 space-y-4">
      {/* Product Suggestion Box */}
      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-xl transition-all duration-300">
        <h3 className="text-sm font-medium text-gray-800">
          Here are some caps under $30 that might interest you.
        </h3>

        <div className="mt-2 space-y-3">
          {products.map((product) => (
            <div
              key={product.id}
              onClick={() => {
                setSelectedProduct(product);
                setShowChat(true); // Show chat when a product is clicked
              }}
              className={`flex cursor-pointer items-center rounded-lg border p-2 transition ${
                selectedProduct?.id === product.id
                  ? 'border-blue-500 bg-blue-100'
                  : 'hover:bg-gray-100'
              }`}
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-14 w-14 rounded-md"
              />
              <div className="ml-3 flex-1">
                <h4 className="text-sm font-semibold text-gray-900">
                  {product.name}
                </h4>
                <p className="text-xs text-gray-600">{product.price}</p>
              </div>
              {selectedProduct?.id === product.id ? (
                <CheckCircleIcon className="h-5 w-5 text-blue-600" />
              ) : (
                <BsArrowRight className="h-4 w-4 text-gray-600" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Floating Chat Box */}
      {showChat && selectedProduct && (
        <div className="fixed bottom-6 right-6 flex w-96 flex-col rounded-xl border border-gray-300 bg-white p-4 shadow-lg">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="h-10 w-10 rounded-lg"
              />
              <span className="text-sm font-medium text-gray-900">
                Ask about {selectedProduct.name}
              </span>
            </div>
            <button
              className="text-gray-500 hover:text-red-600"
              onClick={() => setShowChat(false)}
            >
              <BsX className="h-5 w-5" />
            </button>
          </div>

          {/* Product Card Inside Chatbox */}
          <div className="mt-2 flex items-center rounded-lg border bg-gray-100 p-2">
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="h-12 w-12 rounded-md"
            />
            <div className="ml-3 flex-1">
              <h4 className="text-sm font-semibold text-gray-900">
                {selectedProduct.name}
              </h4>
              <p className="text-xs text-gray-600">{selectedProduct.price}</p>
            </div>
          </div>

          {/* Chat Input */}
          <div className="mt-3 flex items-center rounded-full bg-gray-100 p-2">
            <HiSparkles className="ml-2 h-5 w-5 text-purple-600" />
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder={`Ask about ${selectedProduct.name}`}
              className="flex-1 border-none bg-transparent px-3 text-sm outline-none"
            />
            <button
              className="rounded-full bg-purple-600 p-2 text-white"
              onClick={() =>
                alert(`Question about ${selectedProduct.name}: ${question}`)
              }
            >
              <FiMessageCircle className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
