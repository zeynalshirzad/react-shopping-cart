import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/home/HomePage'
import ProductPage from './pages/product/ProductPage'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropDown from 'react-bootstrap/NavDropDown'
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom'
import Badge from 'react-bootstrap/Badge'
import { useContext } from 'react'
import { Store } from './context/Store'
import CartPage from './pages/cart/CartPage'
import SigninPage from './pages/signin/SigninPage'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ShippingAddressPage from './pages/shipping/ShippingAddressPage'
import SignupPage from './pages/signup/SignupPage'
import PaymentMethodPage from './pages/payment/PaymentMethodPage'
import PlaceOrderPage from './pages/placeorder/PlaceOrderPage'
import OrderPage from './pages/order/OrderPage'
import OrderHistoryPage from './pages/orderhistory/OrderHistoryPage'
import UserProfilePage from './pages/profile/UserProfilePage'

function App() {
  const { state: ctxState, dispatch: ctxDispatch } = useContext(Store)
  const { cart, userInfo } = ctxState

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' })
    localStorage.removeItem('userInfo')
    localStorage.removeItem('shippingAddress')
    localStorage.removeItem('paymentMethod')
  }

  return (
    <BrowserRouter>
      <div className='d-flex flex-column site-container'>
        <ToastContainer position="bottom-center" limit={1} />
        <header>
          <Navbar bg='dark' variant='dark' expand='lg'>
            <Container>
              <LinkContainer to='/'>
                <Navbar.Brand>Shopazon</Navbar.Brand>
              </LinkContainer>
              <Navbar.Toggle aria-controls='basic-navbar-nav' />
              <Navbar.Collapse id='basic-navbar-nav'>
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
                    <NavDropDown title={userInfo.name} id="basic-nav-dropdown">
                      <LinkContainer to="/profile">
                        <NavDropDown.Item>User Profile</NavDropDown.Item>
                      </LinkContainer>
                      <LinkContainer to="/orderhistory">
                        <NavDropDown.Item>Order History</NavDropDown.Item>
                      </LinkContainer>
                      <NavDropDown.Divider />
                      <Link className="dropdown-item"
                        to="/signin"
                        onClick={signoutHandler}>
                        Sign Out
                      </Link>
                    </NavDropDown>
                  ) : (
                    <Link className="nav-link" to="/signin">Sign In</Link>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </header>
        <main>
          <Container className='mt-3'>
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/product/:slug' element={<ProductPage />} />
              <Route path='/cart' element={<CartPage />} />
              <Route path='/signin' element={<SigninPage />} />
              <Route path='/signup' element={<SignupPage />} />
              <Route path='/profile' element={<UserProfilePage />} />
              <Route path='/shipping' element={<ShippingAddressPage />} />
              <Route path='/payment' element={<PaymentMethodPage />} />
              <Route path='/placeorder' element={<PlaceOrderPage />} />
              <Route path='/order/:id' element={<OrderPage />} />
              <Route path='/orderhistory' element={<OrderHistoryPage />} />
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
