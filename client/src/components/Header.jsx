import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import SearchBox from './SearchBox';
import { logout } from '../actions/userActions';

import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { Link } from 'react-router-dom';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Header = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header>
      <Navbar
        className='tw-fixed tw-z-20 tw-w-full'
        bg='info'
        variant='dark'
        expand='lg'
        collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>Ashes Stuffs</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <SearchBox className='tw-mt-6' navigate={navigate} />
            <Nav
              className={`tw-grid ${
                userInfo && userInfo.isAdmin
                  ? 'tw-grid-cols-3'
                  : 'tw-grid-cols-2'
              } sm:tw-justify-items-center sm:-tw-ml-4 sm:tw-mx-5 sm:tw-mt-6`}>
              <Link
                to='/cart'
                className='tw-px-4 tw-py-1 tw-text-lg tw-font-bold tw-rounded-full hover:tw-border tw-text-white tw-text-center hover:tw-text-white'>
                <i className='fas fa-shopping-cart'></i> Cart
              </Link>

              {userInfo ? (
                <Menu
                  as='div'
                  className='tw-relative tw-inline-block tw-text-left tw-z-10 tw-ml-3'>
                  <div>
                    <Menu.Button className='tw-uppercase tw-w-max tw-inline-flex tw-justify-center tw-rounded-md tw-border tw-border-gray-300 tw-shadow-sm tw-px-4 tw-py-2 tw-bg-white tw-text-sm tw-font-medium tw-text-gray-700 hover:tw-bg-gray-50 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-offset-2 focus:tw-ring-offset-gray-100 focus:tw-ring-indigo-500'>
                      <strong>{userInfo.name}</strong>
                      <ChevronDownIcon
                        className='-tw-mr-1 tw-ml-2 tw-h-fit tw-w-5'
                        aria-hidden='true'
                      />
                    </Menu.Button>
                  </div>

                  <Transition
                    as={Fragment}
                    enter='tw-transition tw-ease-out tw-duration-100'
                    enterFrom='tw-transform tw-opacity-0 tw-scale-95'
                    enterTo='tw-transform tw-opacity-100 tw-scale-100'
                    leave='tw-transition tw-ease-in tw-duration-75'
                    leaveFrom='tw-transform tw-opacity-100 tw-scale-100'
                    leaveTo='tw-transform tw-opacity-0 tw-scale-95'>
                    <Menu.Items className='tw-capitalize tw-origin-top-right tw-absolute tw-left-0 tw-mt-2 w-56 tw-rounded-md tw-shadow-lg tw-bg-white tw-ring-1 tw-ring-black tw-ring-opacity-5 focus:tw-outline-none'>
                      <div className='tw-py-1'>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to='/profile'
                              className={classNames(
                                active
                                  ? 'tw-bg-gray-100 tw-text-gray-900'
                                  : 'tw-text-gray-700',
                                'tw-block tw-px-4 tw-py-2 tw-text-sm'
                              )}>
                              Profile
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to='/login'
                              onClick={logoutHandler}
                              className={classNames(
                                active
                                  ? 'tw-bg-gray-100 tw-text-gray-900'
                                  : 'tw-text-gray-700',
                                'tw-block tw-px-4 tw-py-2 tw-text-sm'
                              )}>
                              Sign out
                            </Link>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              ) : (
                // <NavDropdown title={userInfo.name} id='username'>
                //   <LinkContainer to='/profile'>
                //     <NavDropdown.Item>Profile</NavDropdown.Item>
                //   </LinkContainer>
                //   <NavDropdown.Item onClick={logoutHandler}>
                //     Logout
                //   </NavDropdown.Item>
                // </NavDropdown>
                <Link
                  to='/login'
                  className='tw-px-4 tw-py-1 tw-text-lg tw-font-bold tw-rounded-full hover:tw-border tw-text-white tw-text-center hover:tw-text-white'>
                  <i className='fas fa-user'></i> Sign In
                </Link>
              )}
              {userInfo && userInfo.isAdmin && (
                <Menu
                  as='div'
                  className='tw-relative tw-inline-block tw-text-left tw-z-10 tw-ml-3'>
                  <div>
                    <Menu.Button className='tw-inline-flex tw-justify-center tw-rounded-md tw-border tw-border-gray-300 tw-shadow-sm tw-px-4 tw-py-2 tw-bg-white tw-text-sm tw-font-medium tw-text-gray-700 hover:tw-bg-gray-50 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-offset-2 focus:tw-ring-offset-gray-100 focus:tw-ring-indigo-500'>
                      <strong>ADMIN</strong>
                      <ChevronDownIcon
                        className='-tw-mr-1 tw-ml-2 tw-h-5 tw-w-5'
                        aria-hidden='true'
                      />
                    </Menu.Button>
                  </div>

                  <Transition
                    as={Fragment}
                    enter='tw-transition tw-ease-out tw-duration-100'
                    enterFrom='tw-transform tw-opacity-0 tw-scale-95'
                    enterTo='tw-transform tw-opacity-100 tw-scale-100'
                    leave='tw-transition tw-ease-in tw-duration-75'
                    leaveFrom='tw-transform tw-opacity-100 tw-scale-100'
                    leaveTo='tw-transform tw-opacity-0 tw-scale-95'>
                    <Menu.Items className='tw-capitalize tw-origin-top-right tw-absolute tw-left-0 tw-mt-2 w-56 tw-rounded-md tw-shadow-lg tw-bg-white tw-ring-1 tw-ring-black tw-ring-opacity-5 focus:tw-outline-none'>
                      <div className='tw-py-1'>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to='/admin/userlist'
                              className={classNames(
                                active
                                  ? 'tw-bg-gray-100 tw-text-gray-900'
                                  : 'tw-text-gray-700',
                                'tw-block tw-px-4 tw-py-2 tw-text-sm'
                              )}>
                              Users
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to='/admin/productlist'
                              className={classNames(
                                active
                                  ? 'tw-bg-gray-100 tw-text-gray-900'
                                  : 'tw-text-gray-700',
                                'tw-block tw-px-4 tw-py-2 tw-text-sm'
                              )}>
                              Products
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to='/admin/orderlist'
                              className={classNames(
                                active
                                  ? 'tw-bg-gray-100 tw-text-gray-900'
                                  : 'tw-text-gray-700',
                                'tw-block tw-px-4 tw-py-2 tw-text-sm'
                              )}>
                              Orders
                            </Link>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
                // <NavDropdown title='Admin' id='adminmenu'>
                //   <LinkContainer to='/admin/userlist'>
                //     <NavDropdown.Item>Users</NavDropdown.Item>
                //   </LinkContainer>
                //   <LinkContainer to='/admin/productlist'>
                //     <NavDropdown.Item>Products</NavDropdown.Item>
                //   </LinkContainer>
                //   <LinkContainer to='/admin/orderlist'>
                //     <NavDropdown.Item>Orders</NavDropdown.Item>
                //   </LinkContainer>
                // </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
