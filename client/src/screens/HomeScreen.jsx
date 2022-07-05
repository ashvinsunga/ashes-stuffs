import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Product from '../components/Product';
import Message from '../components/Message';
import Loader from '../components/Loader';
import ProductCarousel from '../components/ProductCarousel';
import Meta from '../components/Meta';
import Paginate from '../components/Paginate';
import { listProducts } from '../actions/productActions';
import AppButton from '../components/AppButton';

export const HomeScreen = () => {
  const params = useParams();
  const keyword = params.keyword;
  const pageNumber = params.pageNumber || 1;
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <Meta />
      {!keyword ? (
        <div className='-tw-mt-7'>
          <ProductCarousel />
        </div>
      ) : (
        <Link to='/'>
          <AppButton>Go back</AppButton>
        </Link>
      )}
      <h1 className='tw-text-2xl tw-font-extrabold tw-tracking-tight tw-text-gray-900 tw-m-8'>
        CHECK OUR STUFFS
      </h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <div className='tw-grid tw-grid-cols-4 tw-gap-y-10 tw-gap-x-4 sm:tw-grid-cols-2 md:tw-grid-cols-3 lg:tw-grid-cols-4 xl:tw-grid-cols-5'>
            {products.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
          <Paginate
            page={page}
            pages={pages}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
