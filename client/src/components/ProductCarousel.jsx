import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Rating from './Rating';
import Loader from './Loader';
import Message from './Message';
import { listTopProducts } from '../actions/productActions';

const ProductCarousel = () => {
  const dispatch = useDispatch();

  const productTopRated = useSelector((state) => state.productTopRated);
  const { loading, error, products } = productTopRated;

  const pagination = {
    clickable: true,
  };

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <Swiper
      pagination={pagination}
      effect={'fade'}
      spaceBetween={50}
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
      }}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
      modules={[Autoplay, EffectFade, Pagination]}>
      {products.map((product) => (
        <SwiperSlide key={product._id}>
          <div className='tw-items-center tw-p-4 tw-grid sm:tw-grid-cols-1 md:tw-grid-cols-1 lg:tw-grid-cols-2 xl:tw-grid-cols-2 2xl:tw-grid-cols-2 sm:tw-bg-gradient-to-b tw-from-purple-400 tw-to-white tw-bg-gradient-to-r tw-from-purple-500 tw-to-white'>
            <div className='tw-absolute tw-top-6 tw-place-self-center'>
              <div className='sm:tw-text-xl tw-text-3xl'>TOP PRODUCTS</div>
            </div>
            <div>
              <Link to={`/product/${product._id}`}>
                <img
                  className='tw-h-80 tw-p-5 tw-m-9 tw-rounded-full hover:tw-opacity-75 sm:-tw-ml-1'
                  src={product.image}
                  alt={product.name}
                />
              </Link>
            </div>
            <div className='tw-m-9 tw-mt-9 sm:tw-mt-0'>
              <h1 className='tw-font-bold tw-mb-2 '>
                {product.name} (₱{product.price})
              </h1>
              <Rating value={product.rating} />
              <p className='tw-text-base tw-text-gray-700 tw-mt-3'>
                {product.description}
              </p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ProductCarousel;
