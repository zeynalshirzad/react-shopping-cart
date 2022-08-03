import axios from "axios"
import { useEffect } from "react"
import { useAuthDispatch, useAuthState } from "../../context"
import { fetchFailed, fetchProducts, fetchSucceed } from "../../context/reducer"
import Product from "../Product"
import './products.css'

export default function Products() {

    const dispatch = useAuthDispatch()
    const { loading, error, products } = useAuthState()

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
        <Product key={product.id} product={product} />
    ))

    const loadCm = <h1>Data is loading ...</h1>
    const errorCm = <h1>{error}</h1>

    return (
        <>
            <h1>Featured Products</h1>
            <div className="products">
                {loading ? loadCm :
                    error ? errorCm :
                    productCms}
            </div>
        </>
    )
}