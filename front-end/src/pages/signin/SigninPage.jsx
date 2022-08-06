import { Helmet } from 'react-helmet-async'
import './signinPage.css'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Link, useLocation } from 'react-router-dom'

export default function SigninPage() {

    const { search } = useLocation()
    const redirectInURL = new URLSearchParams(search).get('redirect')
    const redirect = redirectInURL || '/'

    return (
        <Container className="small-container ">
            <Helmet>
                <title>Sign In</title>
            </Helmet>
            <h1 className="my-3">Sign In</h1>
            <Form>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" required />
                </Form.Group>
                <div className="mb-3">
                    <Button type="submit">Sign In</Button>
                </div>
                <div className="mb-3">
                    New customer? <Link to={`/signup?redirect=${redirect}`}>Create new account</Link>
                </div>
            </Form>
        </Container>
    )
}