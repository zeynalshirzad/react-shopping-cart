import axios from 'axios'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/home/HomePage'
import ProductPage from './pages/product/ProductPage'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom'
import Badge from 'react-bootstrap/Badge'
import { useContext, useEffect, useState } from 'react'
import { Store } from './context/Store'
import CartPage from './pages/cart/CartPage'
import SigninPage from './pages/signin/SigninPage'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ShippingAddressPage from './pages/shipping/ShippingAddressPage'
import SignupPage from './pages/signup/SignupPage'
import PaymentMethodPage from './pages/payment/PaymentMethodPage'
import PlaceOrderPage from './pages/placeorder/PlaceOrderPage'
import OrderPage from './pages/order/OrderPage'
import OrderHistoryPage from './pages/orderhistory/OrderHistoryPage'
import UserProfilePage from './pages/profile/UserProfilePage'
import Button from 'react-bootstrap/Button'
import { getError } from './util'
import SearchBox from './components/SearchBox'
import Sidebar from './components/Sidebar'
import SearchPage from './pages/search/SearchPage'

function App() {
  const { state: ctxState, dispatch: ctxDispatch } = useContext(Store)
  const { cart, userInfo } = ctxState
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false)

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' })
    localStorage.removeItem('userInfo')
    localStorage.removeItem('shippingAddress')
    localStorage.removeItem('paymentMethod')
  }

  return (
    <BrowserRouter>
      <div className={
        sidebarIsOpen
          ? 'd-flex flex-column site-container active-cont'
          : 'd-flex flex-column site-container'}>
        <ToastContainer position="bottom-center" limit={1} />
        <header>
          <Navbar bg='dark' variant='dark' expand='lg'>
            <Container>
              <Button
                variant="dark"
                onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
              >
                <i className="fas fa-bars"></i>
              </Button>
              <LinkContainer to='/'>
                <Navbar.Brand>Shopazon</Navbar.Brand>
              </LinkContainer>
              <Navbar.Toggle aria-controls='basic-navbar-nav' />
              <Navbar.Collapse id='basic-navbar-nav'>
                <SearchBox />
                <Nav className="me-auto w-100 justify-content-end">
                  <Link to='/cart' className='nav-link'>
                    Cart
                    {
                      cart.cartItems.length > 0 && (
                        <Badge pill bg='danger'>
                          {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                        </Badge>
                      )
                    }
                  </Link>
                  {userInfo ? (
                    <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                      <LinkContainer to="/profile">
                        <NavDropdown.Item>User Profile</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/orderhistory">
                        <NavDropdown.Item>Order History</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Divider />
                      <Link className="dropdown-item"
                        to="/signin"
                        onClick={signoutHandler}>
                        Sign Out
                      </Link>
                    </NavDropdown>
                  ) : (
                    <Link className="nav-link" to="/signin">Sign In</Link>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </header>
        <Sidebar sidebarIsOpen={sidebarIsOpen} setSidebarIsOpen={setSidebarIsOpen} />
        <main>
          <Container className='mt-3'>
            <Routes>
              <Route path='/signup' element={<SignupPage />} />
              <Route path='/signin' element={<SigninPage />} />
              <Route path='/profile' element={<UserProfilePage />} />
              <Route path='/product/:slug' element={<ProductPage />} />
              <Route path='/cart' element={<CartPage />} />
              <Route path='/search' element={<SearchPage />} />
              <Route path='/shipping' element={<ShippingAddressPage />} />
              <Route path='/payment' element={<PaymentMethodPage />} />
              <Route path='/placeorder' element={<PlaceOrderPage />} />
              <Route path='/order/:id' element={<OrderPage />} />
              <Route path='/orderhistory' element={<OrderHistoryPage />} />
              <Route path='/' element={<HomePage />} />
            </Routes>
          </Container>
        </main>
        <footer>
          <div className='text-center'>All rights reserved</div>
        </footer>
      </div>
    </BrowserRouter>
  )
}

export default App
