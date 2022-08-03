import { Link } from 'react-router-dom'
import './product.css'
export default function Product({ product }) {
    return (
        <div className="product">
            <Link to={`/product/${product.slug}`}>
                <img src={product.image} alt={product.name} />
            </Link>
            <div className='product-info'>
                <Link to={`/product/${product.slug}`}>
                    <p>{product.name}</p>
                </Link>
                <p><strong>${product.price}</strong></p>
                <button>Add to cart</button>
            </div>
        </div>
    )
}