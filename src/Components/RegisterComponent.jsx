import { Button, Col, Container, FormGroup, FormLabel, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


function RegisterComp(){  

    
    const [register, setRegister] = useState({
        name: "",
        surname: "",
        email: "",
        password: "",
        phone_number: "",
        role: ""
        // companyName: "",
        // companyEmail: "",
        // companyPhone: "",
        // VAT: "",
        // address: ""
    })

    // eslint-disable-next-line no-unused-vars
    const [formValid, setFormValid] = useState(false)

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
            navigate('/')
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

                        {/* seconda parte del form riservata allo user con ruolo "exhibitor" */}
{/* 
                        {register.role === "Exhibitor" && (
                            <>
                            <h3>Company information</h3>
                            
                        <Row className="mb-3 text-white">
                            <Col>
                            <FormGroup>
                                <FormLabel>Name</FormLabel>
                                <Form.Control 
                                type="text" 
                                name='companyName'
                                placeholder="Name" 
                                value={register.companyName} 
                                onChange={handleChange}
                                required
                                />                

                            </FormGroup>
                            </Col>
                            <Col>
                            <FormGroup>
                                <FormLabel>VAT</FormLabel>
                                <Form.Control 
                                type="text" 
                                name='VAT'
                                placeholder="VAT" 
                                value={register.VAT} 
                                onChange={handleChange}
                                required
                                />                
                            </FormGroup> 
                            </Col>
                        </Row>

                        <Row className="mb-3 text-white">
                            <Col>
                            <FormGroup>
                                <FormLabel>Phone number</FormLabel>
                                <Form.Control 
                                type="text" 
                                name='companyPhone'
                                placeholder="Phone number" 
                                value={register.companyPhone} 
                                onChange={handleChange}
                                required
                                />                
                            </FormGroup>
                            </Col>
                            <Col>
                            <Form.Group className="mb-3 text-white" controlId="formBasicCompanyEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control 
                                type="email" 
                                placeholder="Enter email" 
                                value={register.companyEmail} 
                                onChange={handleChange} 
                                required
                                />
                            </Form.Group>   
                            </Col>
                        </Row>

                        <Row className="mb-3 text-white">
                            <Col>
                            <FormGroup>
                                <FormLabel>Complete address</FormLabel>
                                <Form.Control 
                                type="text" 
                                name='address'
                                placeholder="Street, street number, city, region, state" 
                                value={register.address} 
                                onChange={handleChange}
                                required
                                />                
                            </FormGroup>
                            </Col>
                        </Row>
                        </>
                        )}  */}

                        <Row className='d-flex justify-content-center my-3'>
                            <Col className='col-4 d-flex justify-content-center'>

                                    <Button variant="primary" type="submit" className='border border-lightn bg-transparent border-3' 
                                    >
                                    Register
                                    </Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Container>

        
    )
}

export default RegisterComp