import Products from '../../components/Products'
import data from '../../data.js'

export default function HomePage() {
    return (
        <Products products={data.products} />
    )
}