import React, { useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Table, Button, Row, Col } from 'react-bootstrap';
import ListButton from '../components/ListButton';
import { useDispatch, useSelector } from 'react-redux';
import AppButton from '../components/AppButton';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import {
  listProducts,
  deleteProduct,
  createProduct,
} from '../actions/productActions';
import { PRODUCT_CREATE_RESET } from '../constants/productConstants';

const ProductListScreen = () => {
  const params = useParams();
  const navigate = useNavigate();
  const pageNumber = params.pageNumber || 1;

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });

    if (!userInfo || !userInfo.isAdmin) {
      navigate('/login');
    }

    if (successCreate) {
      navigate(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(listProducts('', pageNumber));
    }
  }, [
    dispatch,
    navigate,
    userInfo,
    successDelete,
    successCreate,
    createdProduct,
    pageNumber,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteProduct(id));
    }
  };

  const createProductHandler = () => {
    dispatch(createProduct());
  };

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <div className='tw-mt-6'>
          <AppButton className='tw-w-4' onClick={createProductHandler}>
            <i className='fas fa-plus'></i> Create Product
          </AppButton>
        </div>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <table className='tw-min-w-full'>
            <thead className='tw-border-b tw-bg-gray-200'>
              <tr>
                <th
                  scope='col'
                  className='tw-text-sm tw-font-extrabold tw-text-gray-900 tw-px-6 tw-py-4 tw-text-left'>
                  ID
                </th>
                <th
                  scope='col'
                  className='tw-text-sm tw-font-extrabold tw-text-gray-900 tw-px-6 tw-py-4 tw-text-left'>
                  NAME
                </th>
                <th
                  scope='col'
                  className='tw-text-sm tw-font-extrabold tw-text-gray-900 tw-px-6 tw-py-4 tw-text-left'>
                  PRICE
                </th>
                <th
                  scope='col'
                  className='tw-text-sm tw-font-extrabold tw-text-gray-900 tw-px-6 tw-py-4 tw-text-left'>
                  CATEGORY
                </th>
                <th
                  scope='col'
                  className='tw-text-sm tw-font-extrabold tw-text-gray-900 tw-px-6 tw-py-4 tw-text-left'>
                  BRAND
                </th>
                <th
                  scope='col'
                  className='tw-text-sm tw-font-medium tw-text-gray-900 tw-px-6 tw-py-4 tw-text-left'></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  className='tw-border-b tw-transition tw-duration-150 tw-ease-in-out hover:tw-bg-lime-200'
                  key={product._id}>
                  <td className='tw-px-6 tw-py-4 tw-whitespace-nowrap tw-text-sm tw-font-medium tw-text-gray-900'>
                    {product._id}
                  </td>
                  <td className='tw-px-6 tw-py-4 tw-whitespace-nowrap tw-text-sm tw-font-medium tw-text-gray-900'>
                    {product.name}
                  </td>
                  <td className='tw-px-6 tw-py-4 tw-whitespace-nowrap tw-text-sm tw-font-medium tw-text-gray-900'>
                    ₱ {product.price}
                  </td>
                  <td className='tw-px-6  tw-py-4 tw-whitespace-nowrap tw-text-sm tw-font-medium tw-text-gray-900'>
                    {product.category}
                  </td>
                  <td className='tw-px-6  tw-py-4 tw-whitespace-nowrap tw-text-sm tw-font-medium tw-text-gray-900'>
                    {product.brand}
                  </td>
                  <td className='tw-my-2 tw-grid tw-grid-cols-2 sm:tw-grid-cols-1'>
                    <Link to={`/admin/product/${product._id}/edit`}>
                      <ListButton>
                        <i className='fas fa-edit'></i>
                      </ListButton>
                    </Link>

                    <ListButton onClick={() => deleteHandler(product._id)}>
                      <i className='fas fa-trash'></i>
                    </ListButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(product._id)}>
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table> */}
          <Paginate pages={pages} page={page} isAdmin={true} />
        </>
      )}
    </>
  );
};

export default ProductListScreen;
