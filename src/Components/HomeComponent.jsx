import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import '../Home.css';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';

function HomeComp(){

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleLogin = (email, password) => {
        fetch("http://localhost:3001/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
        .then(res => {
            if(res.ok){
                return res.json()
            } else {
                throw new Error ('errore nelle credeziali')
            }
        })
        .then(data => {
            console.log(data)
            const userId = data.id  
            const token = data.token 
            localStorage.setItem('userId', userId)
            localStorage.setItem('token', token)
        })
        .catch(error => {
            throw new Error('errore nel recupero delle credenziali')
        })
    }

    return (
        <Container className='vh-100 d-flex flex-column justify-content-sm-evenly'>
            <Row>
                <Col>
                    {/* <img src="https://cdn.pixabay.com/photo/2017/03/16/21/18/logo-2150297_640.png" className='rounded w-25 d-flex' alt='logo'/> */}
                    <h6 className='text-white'>EpiConnect</h6>
                </Col>
            </Row>
            <Row>
                <Col className='d-flex align-items-center text-white'>
                    <h1>Transforming the World of Textile</h1>
                </Col>
                <Col className='d-flex align-items-center '>
                    <img src="https://cdn.shopify.com/s/files/1/1395/5787/files/mola_2_abstract_1950s_1024x1024.jpg?v=1613952286g" className='rounded w-100' alt='logo'/>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button variant="dark" className='d-flex buttonLogIn px-5 rounded-pill' onClick={handleShow}>Log in</Button>
                </Col>
            </Row>

            {/* modale */}
            <Container >
            <Modal show={show} onHide={handleClose} className='bg-darkBlue'>
                <Modal.Header closeButton className='border border-0 buttonLogIn'>
                    <Modal.Title >Login</Modal.Title>
                </Modal.Header>
                <Modal.Body className='border border-0 buttonLogIn'>
                    <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="name@example.com"
                                    autoFocus
                                    value={email}
                                    onChange={handleEmailChange}
                                />
                                </Form.Group>
                                <Form.Group
                                className="mb-3"
                                controlId="exampleForm.ControlTextarea1"
                                >
                                <Form.Label>Password</Form.Label>
                                <Form.Control 
                                type='password' 
                                placeholder='*********' 
                                autoFocus 
                                value={password}
                                onChange={handlePasswordChange}
                                />
                            </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer className='border border-0 buttonLogIn'>
                    <Link to="/register">
                        <Button variant="secondary" onClick={handleClose}>
                            Register
                        </Button>
                    </Link>
                    <Link 
                    to="/welcome"
                    >
                    <Button variant="primary" onClick={() => handleLogin(email, password)} className='bg-darkBlue border border-0'>
                        Login
                    </Button>
                    </Link>
                </Modal.Footer>
            </Modal>
            </Container>
            {/* fine modale */}

        </Container>
    )
}

export default HomeComp