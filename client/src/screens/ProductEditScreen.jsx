import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import AppButton from '../components/AppButton';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { listProductDetails, updateProduct } from '../actions/productActions';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';

const ProductEditScreen = () => {
  const params = useParams();
  const navigate = useNavigate();
  const productId = params.id;

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      navigate('/admin/productlist');
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setDescription(product.description);
      }
    }
  }, [dispatch, navigate, productId, product, successUpdate]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await axios.post('/api/upload', formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
      })
    );
  };

  return (
    <>
      <Link to='/admin/productlist'>
        <AppButton>Go Back</AppButton>
      </Link>
      <div className='tw-grid tw-grid-cols-1 tw-justify-items-center tw-text-lg'>
        <h1 className='tw-mb-6 tw-font-extrabold'>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <form onSubmit={submitHandler}>
            <div className='tw-text-left'>
              <label>Name</label>
              <br />
              <input
                type='text'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                className='tw-w-96 tw-mb-3 tw-px-4 tw-py-2 tw-font-normal tw-text-gray-700 tw-border tw-border-solid tw-border-gray-300 tw-rounded  focus:tw-border-teal-600 focus:tw-outline-none'></input>
            </div>
            <div>
              <label>Price</label>
              <br />
              <input
                type='number'
                placeholder='Enter price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className='tw-w-96 tw-mb-3 tw-px-4 tw-py-2 tw-font-normal tw-text-gray-700 tw-border tw-border-solid tw-border-gray-300 tw-rounded  focus:tw-border-teal-600 focus:tw-outline-none'></input>
            </div>

            <label>Image</label>
            <br />
            <div className='tw-mb-3 tw-border tw-border-solid tw-border-gray-300 tw-rounded'>
              <div>
                <input
                  type='text'
                  placeholder='Image'
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className='tw-w-96 tw-pl-6 tw-py-2 tw-font-normal tw-text-green-700  focus:tw-border-teal-600 focus:tw-outline-none'></input>
              </div>
              <div>
                <input
                  type='file'
                  // id='image-file'
                  label='Choose File'
                  // custom
                  onChange={uploadFileHandler}
                  className='tw-w-96 tw-pl-6 tw-mb-3 tw-font-normal tw-text-gray-700 tw-rounded  focus:tw-border-teal-600 focus:tw-outline-none'></input>
                {uploading && <Loader />}
              </div>
            </div>
            <div>
              <label>Brand</label>
              <br />
              <input
                type='text'
                placeholder='Enter brand'
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className='tw-w-96 tw-mb-3 tw-px-4 tw-py-2 tw-font-normal tw-text-gray-700 tw-border tw-border-solid tw-border-gray-300 tw-rounded  focus:tw-border-teal-600 focus:tw-outline-none'></input>
            </div>

            <div>
              <label>Count In Stock</label>
              <br />
              <input
                type='number'
                placeholder='Enter countInStock'
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
                className='tw-w-96 tw-mb-3 tw-px-4 tw-py-2 tw-font-normal tw-text-gray-700 tw-border tw-border-solid tw-border-gray-300 tw-rounded  focus:tw-border-teal-600 focus:tw-outline-none'></input>
            </div>

            <div>
              <label>Category</label>
              <br />
              <input
                type='text'
                placeholder='Enter category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className='tw-w-96 tw-mb-3 tw-px-4 tw-py-2 tw-font-normal tw-text-gray-700 tw-border tw-border-solid tw-border-gray-300 tw-rounded  focus:tw-border-teal-600 focus:tw-outline-none'></input>
            </div>

            <div>
              <label>Description</label>
              <br />
              <textarea
                rows='4'
                cols='50'
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className='tw-w-96 tw-mb-3 tw-px-4 tw-py-2 tw-font-normal tw-text-gray-700 tw-border tw-border-solid tw-border-gray-300 tw-rounded  focus:tw-border-teal-600 focus:tw-outline-none'></textarea>
            </div>

            <AppButton type='submit'>Update</AppButton>
          </form>

          // <Form onSubmit={submitHandler}>
          //   <Form.Group controlId='name'>
          //     <Form.Label>Name</Form.Label>
          //     <Form.Control
          //       type='name'
          //       placeholder='Enter name'
          //       value={name}
          //       onChange={(e) => setName(e.target.value)}></Form.Control>
          //   </Form.Group>

          //   <Form.Group controlId='price'>
          //     <Form.Label>Price</Form.Label>
          //     <Form.Control
          //       type='number'
          //       placeholder='Enter price'
          //       value={price}
          //       onChange={(e) => setPrice(e.target.value)}></Form.Control>
          //   </Form.Group>

          //   <Form.Group controlId='image'>
          //     <Form.Label>Image</Form.Label>
          //     <Form.Control
          //       type='text'
          //       placeholder='Enter image url'
          //       value={image}
          //       onChange={(e) => setImage(e.target.value)}></Form.Control>
          //     <Form.Control
          //       type='file'
          //       // id='image-file'
          //       label='Choose File'
          //       // custom
          //       onChange={uploadFileHandler}></Form.Control>
          //     {uploading && <Loader />}
          //   </Form.Group>

          //   <Form.Group controlId='brand'>
          //     <Form.Label>Brand</Form.Label>
          //     <Form.Control
          //       type='text'
          //       placeholder='Enter brand'
          //       value={brand}
          //       onChange={(e) => setBrand(e.target.value)}></Form.Control>
          //   </Form.Group>

          //   <Form.Group controlId='countInStock'>
          //     <Form.Label>Count In Stock</Form.Label>
          //     <Form.Control
          //       type='number'
          //       placeholder='Enter countInStock'
          //       value={countInStock}
          //       onChange={(e) =>
          //         setCountInStock(e.target.value)
          //       }></Form.Control>
          //   </Form.Group>

          //   <Form.Group controlId='category'>
          //     <Form.Label>Category</Form.Label>
          //     <Form.Control
          //       type='text'
          //       placeholder='Enter category'
          //       value={category}
          //       onChange={(e) => setCategory(e.target.value)}></Form.Control>
          //   </Form.Group>

          //   <Form.Group controlId='description'>
          //     <Form.Label>Description</Form.Label>
          //     <Form.Control
          //       type='text'
          //       placeholder='Enter description'
          //       value={description}
          //       onChange={(e) => setDescription(e.target.value)}></Form.Control>
          //   </Form.Group>

          //   <Button type='submit' variant='primary'>
          //     Update
          //   </Button>
          // </Form>
        )}
      </div>
    </>
  );
};

export default ProductEditScreen;
