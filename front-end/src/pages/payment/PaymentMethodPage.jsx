import { Helmet } from "react-helmet-async"
import CheckoutSteps from "../../components/CheckoutSteps"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useContext, useEffect, useState } from "react"
import { Store } from "../../context/Store"
import { useNavigate } from "react-router-dom"

export default function PaymentMethodPage() {

  const { state: ctxState, dispatch: ctxDispatch } = useContext(Store)
  const { cart: { shippingAddress, paymentMethod } } = ctxState

  const navigate = useNavigate()

  const [paymentMethodName, setPaymentMethodName] = useState(paymentMethod || 'PayPal')

  const submitHandler = (e) => {
    e.preventDefault()
    ctxDispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethodName })
    localStorage.setItem('paymentMethod', paymentMethodName)
    navigate('/placeorder')
  }

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping')
    }
  },[navigate, shippingAddress.address])

  return (
    <div>
      <Helmet>
        <title>Payment Method</title>
      </Helmet>
      <CheckoutSteps step1 step2 step3 />
      <div className="container small-container">
        <h1 className="mb-3">Payment Methods</h1>
        <Form onSubmit={submitHandler}>
          <Form.Check
            type="radio"
            id="PayPal"
            label="PayPal"
            value="PayPal"
            checked={paymentMethodName === 'PayPal'}
            onChange={(e) => setPaymentMethodName(e.target.value)} />
          <Form.Check
            type="radio"
            id="Stripe"
            label="Stripe"
            value="Stripe"
            checked={paymentMethodName === 'Stripe'}
            onChange={(e) => setPaymentMethodName(e.target.value)} />
          <div className="mb-3">
            <Button type="submit">Continue</Button>
          </div>
        </Form>
      </div>
    </div>
  )
}