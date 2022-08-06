import express from 'express'
import mongoose from 'mongoose'
import 'dotenv/config'
import seedRouter from './routes/seedRoutes.js'
import productRouter from './routes/productRouter.js'

mongoose.connect(process.env.MONGODB_URI,{family: 4})
    .then(() => {
        console.log('Connected to DB')
    })
    .catch(err => {
        console.log(err.message)
    })

const app = express()

app.use('/api/seed', seedRouter)
app.use('/api/products', productRouter)

const port = process.env.SERVER_PORT || 5000
app.listen(port, () => {
    console.log(`serve at http://localhost:${port}`)
})