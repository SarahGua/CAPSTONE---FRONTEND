import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import '../Home.css';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';
import LOGO from '../Img/LOGO.png'

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
        fetch(process.env.REACT_APP_BE_URL + "/auth/login", {
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
        <div className='vh-100 d-flex flex-column justify-content-sm-between bgImg-home p-5'>
            <Row>
                <Col className='d-flex align-items-center'>
                    <img src={LOGO} className='rounded-circle logo-border d-flex me-3' alt='logo'/>
                    <h6 className='text-white  m-0'>EventConnect</h6>
                </Col>
            </Row>
            <Row>
                <Col className='text-white fw-bold font-8'>
                    <h1>Transforming <br /> the World of Textile</h1>
                </Col>

            </Row>
            <Row>
                <Col className='d-flex justify-content-center'>
                    <Button variant="dark" className='d-flex border border-lightn bg-transparent border-3 px-5 rounded-pill' onClick={handleShow}>Log in</Button>
                </Col>
            </Row>

            {/* modale */}
            <Container >
            <Modal show={show} onHide={handleClose} className='bg-darkBlue text-white'>
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

        </div>
    )
}

export default HomeComp