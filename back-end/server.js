import express from 'express'
import data from './data.js'
import 'dotenv/config'

const app = express()

app.get('/api/products', (req, res) => {
    res.send(data.products)
})

const port = process.env.SERVER_PORT || 5000
app.listen(port, () => {
    console.log(`serve at http://localhost:${port}`)
})