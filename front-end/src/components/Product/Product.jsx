import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import './product.css'
import Rating from '../Rating'
import { Store } from '../../context/Store'
import { useContext } from 'react'
import axios from 'axios'
export default function Product({ product }) {

    const { state: ctxState, dispatch: ctxDispatch } = useContext(Store)

    const {
        cart: { cartItems }
    } = ctxState

    const addToCartHandler = async () => {
        const existItem = cartItems.find(p => p._id === product._id)
        const quantity = existItem ? existItem.quantity + 1 : 1
        debugger
        const { data } = await axios.get(`/api/products/${product._id}`)
        if (data.countInStock < quantity) {
            window.alert('Sorry. Product is out of stock')
            return
        }
        ctxDispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } })
    }

    return (
        <Card>
            <Link to={`/product/${product.slug}`}>
                <img src={product.image} className="card-img-top" alt={product.name} />
            </Link>
            <Card.Body>
                <Link to={`/product/${product.slug}`}>
                    <Card.Title>{product.name}</Card.Title>
                </Link>
                <Rating rating={product.rating} numReviews={product.numReviews} />
                <Card.Text>${product.price}</Card.Text>
                <Button
                    onClick={addToCartHandler}
                    variant={product.countInStock === 0 ? 'light' : 'primary'}
                    disabled={product.countInStock === 0}>
                    {product.countInStock ? 'Add to cart' : 'Out of stock'}
                </Button>
            </Card.Body>
        </Card>
    )
}