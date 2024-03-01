import { Alert, Button, Col, Container, FormGroup, FormLabel, Modal, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


function RegisterComp(){  

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [register, setRegister] = useState({
        name: "",
        surname: "",
        email: "",
        password: "",
        phone_number: "",
        role: ""
    })


    const [formValid, setFormValid] = useState(false)

    const [registerSuccess, setRegisterSuccess] = useState(false)

    const navigate = useNavigate();

    useEffect(() => {
        console.log(register)
    }, [register])

    const handleChange = (e) => {
        if(e.target.type === "radio" && e.target.checked){
            setRegister(prevState => ({
                ...prevState,
                role: e.target.value
            }))
        }

        setRegister(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    }

    useEffect(() => {
        setFormValid(Object.values(register).every((value) => value !== ''))
    }, [register])

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(process.env.REACT_APP_BE_URL + "/auth/register", {
            method: "POST",
            body: JSON.stringify(register),
            headers: { "Content-type": "application/json" },
        })
        .then(res => {
            if(res.ok){
                return res.json()
            } else {
                throw new Error('errore', e)
            }
        })
        .then(data => {
            console.log(data)
            setRegisterSuccess(true)
            handleShow()
            // navigate('/')
        })
        .catch(e => {
            console.log('errore nella registrazione', e)
        })
    }

    return (
        <Container>
            <Row>
                <Col>
                    <Form onSubmit={handleSubmit}>
                    {['radio'].map((radio) => (
                        <div key={`inline-${radio}`} className="mb-3 d-flex justify-content-center mt-5">
                        <Form.Check
                            inline
                            label="Exhibitor"
                            name="role"
                            value={"Exhibitor"}
                            type={radio}
                            id={`inline-${radio}-1`}
                            className='text-white'
                            onChange={handleChange}
                            required
                        />
                        <Form.Check
                            inline
                            label="Client"
                            name="role"
                            value={"Client"}
                            type={radio}
                            id={`inline-${radio}-2`}
                            className='text-white'
                            onChange={handleChange}
                            required
                        />
                        </div>
                    ))}

                        <Row className='d-flex justify-content-center'>
                            <Col className='col-6'>
                            <FormGroup>
                                <FormLabel className='text-white'>Name</FormLabel>
                                <Form.Control 
                                type="text" 
                                name='name'
                                placeholder="Name" 
                                value={register.name} 
                                onChange={handleChange}
                                required
                                />                
                            </FormGroup>
                            </Col>
                        </Row>

                        <Row className='d-flex justify-content-center mt-3'>
                            <Col className='col-6'>
                            <FormGroup>
                                <FormLabel className='text-white'>Surname</FormLabel>
                                <Form.Control 
                                type="text" 
                                name='surname'
                                placeholder="Surname" 
                                value={register.surname} 
                                onChange={handleChange}
                                required
                                />                
                            </FormGroup>
                            </Col>
                        </Row>

                        <Row className='d-flex justify-content-center mt-3'>
                            <Col className='col-6'>
                            <FormGroup>
                                <FormLabel className='text-white'>Phone number</FormLabel>
                                <Form.Control 
                                type="text" 
                                name='phone_number'
                                placeholder="+39 333 3333333" 
                                value={register.phone_number} 
                                onChange={handleChange}
                                required
                                />                
                            </FormGroup>
                            </Col>
                        </Row>

                        <Row className='d-flex justify-content-center mt-3'>
                            <Col className='col-6'>
                            <Form.Group className=" text-white" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control 
                                type="email"
                                name='email'
                                placeholder="example@example.com" 
                                value={register.email} 
                                onChange={handleChange}
                                required
                                />
                            </Form.Group>
                            </Col>
                        </Row>

                        <Row className='d-flex justify-content-center mt-3'>
                            <Col className='col-6'>
                            <Form.Group className="mb-3 text-white" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control 
                                type="password" 
                                name='password'
                                placeholder="*********" 
                                value={register.password} 
                                onChange={handleChange}
                                required
                                />
                            </Form.Group>
                            </Col>
                        </Row>

                        <Row className='d-flex justify-content-center my-3'>
                            <Col className='col-4 d-flex justify-content-center'>

                                    <Button variant="primary" type="submit" className='border border-lightn bg-transparent border-3' 
                                    >
                                    Register
                                    </Button>
                            </Col>
                        </Row>

                        {/* ------------------------modale------------------------ */}
                        <Modal show={show} onHide={handleClose} className='bg-darkBlue text-white'>
                            <Modal.Header closeButton className='border border-0 buttonLogIn'>
                            <Modal.Title>User successfully registered!</Modal.Title>
                            </Modal.Header>
                            <Modal.Body className='border border-0 buttonLogIn'>Please, go to your profile page and complete it!</Modal.Body>
                            <Modal.Footer className='border border-0 buttonLogIn'>
                            <Button variant="primary" onClick={() => {
                                handleClose(); 
                                navigate('/'); 
                            }} className='bg-darkBlue border border-0'>
                                Got it
                            </Button>
                            </Modal.Footer>
                        </Modal>

                    </Form>
                </Col>
            </Row>


        </Container>

        
    )
}

export default RegisterComp