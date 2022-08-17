import axios from 'axios'
import { useEffect, useState } from 'react'
import Nav from 'react-bootstrap/Nav'
import { LinkContainer } from 'react-router-bootstrap'
import { toast } from 'react-toastify'
import { getError } from '../../util'
export default function Sidebar({ sidebarIsOpen, setSidebarIsOpen }) {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const { data } = await axios.get(`/api/products/categories`)
                setCategories(data)
            } catch (err) {
                toast.error(getError(err))
            }
        }
        fetchCategories()
    }, [])

    return (
        <div
            className={
                sidebarIsOpen
                    ? 'active-nav side-navbar d-flex justify-content-between flex-wrap flex-column'
                    : 'side-navbar d-flex justify-content-between flex-wrap flex-column'
            }
        >
            <Nav className="flex-column text-white w-100 p-2">
                <Nav.Item>
                    <strong>Categories</strong>
                </Nav.Item>
                {categories.map((category) => (
                    <Nav.Item key={category}>
                        <LinkContainer
                            to={`/search?category=${category}`}
                            onClick={() => setSidebarIsOpen(false)}
                        >
                            <Nav.Link>{category}</Nav.Link>
                        </LinkContainer>
                    </Nav.Item>
                ))}
            </Nav>
        </div>
    )
}