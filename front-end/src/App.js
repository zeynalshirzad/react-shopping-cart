// feature 1
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import HomePage from './pages/home/HomePage'
import ProductPage from './pages/product/ProductPage'

function App() {
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header>
          <Link to="/">React Shopping Cart</Link>
        </header>
        <main>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/product/:slug' element={<ProductPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
