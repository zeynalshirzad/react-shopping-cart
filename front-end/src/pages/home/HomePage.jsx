import { Helmet } from 'react-helmet-async'
import Products from '../../components/Products'

export default function HomePage() {

    return (
        <>
            <Helmet>
                <title>Shopazon</title>
            </Helmet>
            <Products />
        </>
    )
}