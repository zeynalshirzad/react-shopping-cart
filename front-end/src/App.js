// feature 1
import Products from './components/Products/Products'
import data from './data.js'
function App() {
  console.log(data.products);
  return (
    <div className="grid-container">
      <header>
        <a href="/">React Shopping Cart</a>
      </header>
      <main>
        <Products products={data.products} />
      </main>
    </div>
  )
}

export default App
