import { useEffect } from 'react'
import Products from '../../components/Products'
import axios from 'axios'
import { useAuthDispatch, useAuthState } from '../../context'
import { fetchFailed, fetchProducts, fetchSucceed } from '../../context/reducer'

export default function HomePage() {

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

    const loadCm = <h1>Data is loading ...</h1>
    const errorCm = <h1>{error}</h1>

    return (
        <>
            {loading ? loadCm :
                error ? errorCm :
                    <Products products={products} />}
        </>

    )
}