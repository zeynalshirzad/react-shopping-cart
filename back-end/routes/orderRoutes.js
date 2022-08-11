import express from 'express'
import { isAuth } from '../util.js'
import expressAsyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'

const orderRouter = express.Router()

orderRouter.post('/', isAuth, expressAsyncHandler(async (req, res) => {
    console.log(1111);
    const newOrder = new Order({
        orderItems: req.body.orderItems.map(item => ({ ...item, product: item._id })),
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        itemsPrice: req.body.itemsPrice,
        shippingPrice: req.body.shippingPrice,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
        user: req.user._id
    })

    const order = await newOrder.save()
    res.status(201).send({ message: 'New Order Created', order})
}))

export default orderRouter