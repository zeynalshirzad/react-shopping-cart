import axios from "axios"
import { useEffect, useReducer } from "react"
import { reducer, initalState, fetchFailed, fetchProducts, fetchSucceed } from "./productsReducer"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Product from "../Product"
import './products.css'
import Loading from "../utils/Loading"
import MessageBox from "../utils/MessageBox"

export default function Products() {

    const [state, dispatch] = useReducer(reducer, initalState)
    const { loading, error, products } = state

    useEffect(() => {
        const loadProducts = async () => {
            dispatch(fetchProducts())
            try {
                const response = await axios.get('/api/products')
                dispatch(fetchSucceed(response.data))
            } catch (err) {
                dispatch(fetchFailed('There is an error in fetching data'))
            }

        }
        loadProducts()
    }, [dispatch])

    const productCms = products?.map(product => (
        <Col key={product._id} sm={6} md={4} lg={3} className="mb-3">
            <Product product={product} />
        </Col>
    ))

    return (
        <>
            <h1>Featured Products</h1>
            <div className="products">
                {loading ? (
                    <Loading />
                ) : error ? (
                    <MessageBox variant='danger'>
                        {error} 
                    </MessageBox>
                ) : (
                    <Row>
                        {productCms}
                    </Row>
                )
                }
            </div>
        </>
    )
}