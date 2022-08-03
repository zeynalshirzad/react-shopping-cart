import Product from "../Product"
import './products.css'

export default function Products({ products }) {
    const productCms = products.map(product => (
        <Product key={product.id} product={product} />
    ))
    return (
        <>
            <h1>Featured Products</h1>
            <div className="products">
                {productCms}
            </div>
        </>
    )
}