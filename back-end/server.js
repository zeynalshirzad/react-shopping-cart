import express from 'express'
import data from './data.js'
import 'dotenv/config'

const app = express()

app.get('/api/products', (req, res) => {
    res.send(data.products)
})

app.get('/api/product/:slug', (req, res) => {
    const product = data.products.find(p => p.slug === req.params.slug)
    if (product) {
        res.send(product)
    } else {
        res.status(404).send({ message: 'Product not found' })
    }
})

const port = process.env.SERVER_PORT || 5000
app.listen(port, () => {
    console.log(`serve at http://localhost:${port}`)
})