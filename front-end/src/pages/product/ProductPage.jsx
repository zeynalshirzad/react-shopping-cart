import axios from "axios"
import { useEffect, useReducer } from "react"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Card from "react-bootstrap/Card"
import ListGroup from 'react-bootstrap/ListGroup'
import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button'
import { useNavigate, useParams } from "react-router-dom"
import { fetchFailed, fetchProduct, fetchSucceed, initalState, reducer } from './pruductReducer'
import Rating from "../../components/Rating"
import { Helmet } from "react-helmet-async"
import Loading from "../../components/utils/Loading"
import MessageBox from "../../components/utils/MessageBox"
import { useContext } from "react"
import { Store } from "../../context/Store"

export default function ProductPage() {
    const navigate = useNavigate()
    const { slug } = useParams()
    const [state, dispatch] = useReducer(reducer, initalState)
    const { state: ctxState, dispatch: ctxDispatch } = useContext(Store)
    const { cart } = ctxState
    const { loading, product, error } = state

    useEffect(() => {
        dispatch(fetchProduct())
        const LoadProduct = async () => {
            try {
                const response = await axios.get(`/api/products/slug/${slug}`)
                dispatch(fetchSucceed(response.data))
            } catch (err) {
                dispatch(fetchFailed(err.response.data.message))
            }

        }
        LoadProduct()
    }, [slug])



    const addToCartHandler = async () => {
        const existItem = cart.cartItems.find(p => p._id === product._id)
        const quantity = existItem ? existItem.quantity + 1 : 1
        const { data } = await axios.get(`/api/products/${product._id}`)
        if (data.countInStock < quantity) {
            window.alert('Sorry. Product is out of stock')
            return
        }
        ctxDispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } })
        navigate('/cart')
    }

    return (
        <>
            {
                loading ? (
                    <Loading />
                ) : error ? (
                    <MessageBox variant='danger'>
                        {error} 
                    </MessageBox>
                ) : (
                    <div>
                        <Row>
                            <Col md={6}>
                                <img className="img-large" src={product.image} alt={product.name} />
                            </Col>
                            <Col md={3}>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <Helmet>
                                            <title>{product.name}</title>
                                        </Helmet>
                                        <h1>{product.name}</h1>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Rating rating={product.rating} numReviews={product.numReviews} />
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        Price : ${product.price}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        Description:
                                        <p>{product.description}</p>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Col>
                            <Col md={3}>
                                <Card>
                                    <Card.Body>
                                        <ListGroup variant="flush">
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Price:</Col>
                                                    <Col>${product.price}</Col>
                                                </Row>
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Status:</Col>
                                                    <Col>
                                                        {product.countInStock > 0 ? (
                                                            <Badge bg="success">In Stock</Badge>
                                                        ) : (
                                                            <Badge bg="danger">Out of Stuck</Badge>
                                                        )}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                            {product.countInStock > 0 && (
                                                <ListGroup.Item>
                                                    <div className="d-grid">
                                                        <Button onClick={addToCartHandler} variant="primary">
                                                            Add to Cart
                                                        </Button>
                                                    </div>
                                                </ListGroup.Item>
                                            )}
                                        </ListGroup>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                )
            }
        </>
    )
}