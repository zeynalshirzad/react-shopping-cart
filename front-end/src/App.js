import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/home/HomePage'
import ProductPage from './pages/product/ProductPage'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom'
import Badge from 'react-bootstrap/Badge'
import { useContext } from 'react'
import { Store } from './context/Store'

function App() {
  const { state: ctxState } = useContext(Store)
  const { cart } = ctxState

  return (
    <BrowserRouter>
      <div className='d-flex flex-column site-container'>
        <header>
          <Navbar bg='dark' variant='dark'>
            <Container>
              <LinkContainer to='/'>
                <Navbar.Brand>Shopazon</Navbar.Brand>
              </LinkContainer>
              <Nav className="me-auto">
                <Link to='/cart' className='nav-link'>
                  Cart
                  {
                    cart.cartItems.length > 0 && (
                      <Badge pill bg='danger'>
                        {cart.cartItems.length}
                      </Badge>
                    )
                  }
                </Link>
              </Nav>
            </Container>
          </Navbar>
        </header>
        <main>
          <Container className='mt-3'>
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/product/:slug' element={<ProductPage />} />
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
