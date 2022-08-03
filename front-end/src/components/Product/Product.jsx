import './product.css'
export default function Product({ product }) {
    return (
        <div className="product">
            <a href={`/product/${product.slug}`}>
                <img src={product.image} alt={product.name} />
            </a>
            <div className='product-info'>
                <a href={`/product/${product.slug}`}>
                    <p>{product.name}</p>
                </a>
                <p><strong>${product.price}</strong></p>
                <button>Add to cart</button>
            </div>
        </div>
    )
}