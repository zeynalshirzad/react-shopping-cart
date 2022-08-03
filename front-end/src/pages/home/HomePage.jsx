import { useEffect, useState } from 'react'
import Products from '../../components/Products'
// import data from '../../data.js'
import axios from 'axios'

export default function HomePage() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchProducts = async () => {

            const response = await axios.get('/api/products')
            setProducts(response.data)
            setLoading(false)
        }
        fetchProducts()
    }, [])
    return (
        <>
            {loading ? <h1>Data is loading ...</h1> : <Products products={products} />}
        </>

    )
}