import express from 'express'
import data from './data.js'
import 'dotenv/config'

const app = express()

app.get('/api/products', (req, res) => {
    res.send(data.products)
})

app.get('/api/products/slug/:slug', (req, res) => {
    console.log(22222222222);
    const product = data.products.find(p => p.slug === req.params.slug)
    if (product) {
        res.send(product)
    } else {
        res.status(404).send({ message: 'Product not found' })
    }
})

app.get('/api/products/:id', (req, res) => {
    console.log(1111111111111);
    const product = data.products.find(p => p._id === req.params.id)
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