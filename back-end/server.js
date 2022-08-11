import express from 'express'
import mongoose from 'mongoose'
import 'dotenv/config'
import seedRouter from './routes/seedRoutes.js'
import productRouter from './routes/productRoutes.js'
import userRouter from './routes/userRoutes.js'
import orderRouter from './routes/orderRoutes.js'

mongoose.connect(process.env.MONGODB_URI, { family: 4 })
    .then(() => {
        console.log('Connected to DB')
    })
    .catch(err => {
        console.log(err.message)
    })

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/seed', seedRouter)
app.use('/api/products', productRouter)
app.use('/api/users', userRouter)
app.use('/api/orders', orderRouter)

app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message })
})

const port = process.env.SERVER_PORT || 5000
app.listen(port, () => {
    console.log(`serve at http://localhost:${port}`)
})