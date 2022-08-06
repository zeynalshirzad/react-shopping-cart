import { useContext } from "react"
import { Helmet } from "react-helmet-async"
import { Store } from '../../context/Store'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import MessageBox from "../../components/utils/MessageBox"
import { Link, useNavigate } from "react-router-dom"
import './cart.css'
import axios from "axios"

export default function CartPage() {

    const navigate = useNavigate()
    const { state: ctxState, dispatch: ctxDispatch } = useContext(Store)
    const {
        cart: { cartItems }
    } = ctxState

    const subtotal = cartItems.reduce((a, c) => a + c.quantity, 0)
    const subtotalPrice = cartItems.reduce((a, c) => a + c.price * c.quantity, 0)

    const updateItemQuantityHandler = async (item, num) => {
        const newQuantity = item.quantity + num
        const { data } = await axios.get(`/api/products/${item._id}`)
        if (data.countInStock < newQuantity) {
            window.alert('Sorry. Product is out of stock')
            return
        }
        ctxDispatch({ type: 'CART_UPDATE_ITEM_QUANTITY', payload: { ...item, quantity: newQuantity } })
    }

    const deleteItemInCartHandler = async (itemId) => {
        ctxDispatch({ type: 'CART_DELETE_ITEM', payload: itemId })
    }

    const checkoutHandler = () => {
        navigate('/signin?redirect=/shipping')
    }

    return (
        <div>
            <Helmet>
                <title>Shopping Cart</title>
            </Helmet>
            <h1>Shopping Cart</h1>
            <Row>
                <Col md={8}>
                    {cartItems.length === 0 ? (
                        <MessageBox message={`Cart is empty` +  <Link to="/">Go Shopping</Link>}>
                            Cart is empty {<Link to="/">Go Shopping</Link>}
                        </MessageBox>
                    ) : (
                        <ListGroup>
                            {cartItems.map(item => (
                                <ListGroup.Item key={item._id}>
                                    <Row className="align-items-center">
                                        <Col md={4}>
                                            <img src={item.image} alt={item.name} className="img-fluid rounded img-thumbnail" />
                                            {' '}
                                            <Link to={`/product/${item.slug}`}>{item.name}</Link>
                                        </Col>
                                        <Col md={3}>
                                            <Button
                                                onClick={() => updateItemQuantityHandler(item, -1)}
                                                variant="light"
                                                disabled={item.quantity === 1}>
                                                <i className="fas fa-minus-circle" />
                                            </Button>
                                            {' '}
                                            <span>{item.quantity}</span>
                                            {' '}
                                            <Button
                                                onClick={() => updateItemQuantityHandler(item, 1)}
                                                variant="light"
                                                disabled={item.quantity === item.countInStock}>
                                                <i className="fas fa-plus-circle"></i>
                                            </Button>
                                        </Col>
                                        <Col md={3}>
                                            ${item.price}
                                        </Col>
                                        <Col md={2}>
                                            <Button variant="light" onClick={() => deleteItemInCartHandler(item._id)}>
                                                <i className="fas fa-trash"></i>
                                            </Button>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
                </Col>
                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <h3>
                                        {`Subtotal ${subtotal} items : $${subtotalPrice}`}
                                    </h3>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <div className="d-grid">
                                        <Button
                                            onClick={checkoutHandler}
                                            variant="primary"
                                            disabled={cartItems.length === 0}>
                                            Proceed to Checkout
                                        </Button>
                                    </div>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}