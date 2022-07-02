import React from 'react';

import Rating from './Rating';

const Product = ({ product }) => {
  return (
    <a
      key={product.id}
      href={`/product/${product._id}`}
      className='tw-border-2 hover:tw-border-teal-600 tw-p-3'>
      <div className='tw-w-full tw-aspect-w-1 tw-aspect-h-1 tw-bg-gray-200 tw-rounded-lg tw-overflow-hidden xl:tw-aspect-w-7 xl:tw-aspect-h-8'>
        <img
          src={product.image}
          alt={product.title}
          className='tw-w-full tw-h-full tw-object-center tw-object-cover'
        />
      </div>
      <h3 className='tw-mt-4 tw-text-sm tw-text-gray-700'>{product.name}</h3>
      <div>
        <Rating value={product.rating} text={`${product.numReviews} reviews`} />
      </div>
      <p className='tw-mt-1 tw-text-lg tw-font-medium tw-text-gray-900'>
        ₱{product.price}
      </p>
    </a>
  );
};

export default Product;
