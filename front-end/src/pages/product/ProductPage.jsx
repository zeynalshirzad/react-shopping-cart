import axios from "axios"
import { useEffect, useReducer } from "react"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Card from "react-bootstrap/Card"
import ListGroup from 'react-bootstrap/ListGroup'
import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button'
import { useParams } from "react-router-dom"
import { fetchFailed, fetchProduct, fetchSucceed, initalState, reducer } from '../../context/pruductReducer'
import Rating from "../../components/Rating"
import { Helmet } from "react-helmet-async"
import Loading from "../../components/utils/Loading"
import MessageBox from "../../components/utils/MessageBox"

export default function ProductPage() {
    const { slug } = useParams()
    const [state, dispatch] = useReducer(reducer, initalState)
    const { loading, product, error } = state

    useEffect(() => {
        dispatch(fetchProduct())
        const LoadProduct = async () => {
            try {
                const response = await axios.get(`/api/product/${slug}`)
                dispatch(fetchSucceed(response.data))
            } catch (err) {
                dispatch(fetchFailed(err.response.data.message))
            }

        }
        LoadProduct()
    }, [slug])

    // const loadingCm = <div>Product is loading ...</div>
    // const errorCM = <div>{error}</div>
    return (
        <>
            {
                loading ? (
                    <Loading />
                ) : error ? (
                    <MessageBox variant='danger' message={error} />
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
                                                        <Button variant="primary">
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