import { Button, Col, Container, FormControl, FormGroup, FormLabel, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import React, { useState } from 'react';


function RegisterComp(){  
    
    const [userRole, setUserRole] = useState("");

    return (
        <Container>
            <Row>
                <Col>
                    <Form>
                    {['radio'].map((radio) => (
                        <div key={`inline-${radio}`} className="mb-3 d-flex justify-content-around mt-5">
                        <Form.Check
                            inline
                            label="Exhibitor"
                            name="group1"
                            type={radio}
                            id={`inline-${radio}-1`}
                            className='text-white'
                            onChange={() => setUserRole("Exhibitor")}
                        />
                        <Form.Check
                            inline
                            label="Client"
                            name="group1"
                            type={radio}
                            id={`inline-${radio}-2`}
                            className='text-white'
                            onChange={() => setUserRole("Client")}
                        />
                        </div>
                    ))}
                        <Row className="mb-3 text-white">
                            <Col>
                            <FormGroup>
                                <FormLabel>Name</FormLabel>
                                <Form.Control type="text" placeholder="Name" />                
                            </FormGroup>
                            </Col>
                            <Col>
                            <FormGroup>
                                <FormLabel>Surname</FormLabel>
                                <Form.Control type="text" placeholder="Surname" />                
                            </FormGroup>
                            </Col>
                        </Row>

                        <Row className="mb-3 text-white">
                            <Col>
                            <FormGroup>
                                <FormLabel>Phone number</FormLabel>
                                <Form.Control type="text" placeholder="Phone number" />                
                            </FormGroup>
                            </Col>
                            <Col>
                            <Form.Group className="mb-3 text-white" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" />
                            </Form.Group>
                            </Col>
                        </Row>

                        <Row className='d-flex justify-content-center'>
                            <Col className='col-6'>
                            <Form.Group className="mb-3 text-white" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" />
                            </Form.Group>
                            </Col>
                        </Row>

                        {/* seconda parte del form riservata allo user con ruolo "exhibitor" */}

                        {userRole === "Exhibitor" && (
                            <>
                            
                        <Row className="mb-3 text-white">
                            <Col>
                            <FormGroup>
                                <FormLabel>Name</FormLabel>
                                <Form.Control type="text" placeholder="Name" />                
                            </FormGroup>
                            </Col>
                            <Col>
                            <FormGroup>
                                <FormLabel>VAT</FormLabel>
                                <Form.Control type="text" placeholder="VAT" />                
                            </FormGroup> 
                            </Col>
                        </Row>

                        <Row className="mb-3 text-white">
                            <Col>
                            <FormGroup>
                                <FormLabel>Phone number</FormLabel>
                                <Form.Control type="text" placeholder="Phone number" />                
                            </FormGroup>
                            </Col>
                            <Col>
                            <Form.Group className="mb-3 text-white" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" />
                            </Form.Group>   
                            </Col>
                        </Row>

                        <Row className="mb-3 text-white">
                            <Col>
                            <FormGroup>
                                <FormLabel>Complete address</FormLabel>
                                <Form.Control type="text" placeholder="Street, street number, city, region, state" />                
                            </FormGroup>
                            </Col>
                        </Row>

                        <Row className='d-flex justify-content-center'>
                            <Col className='col-4 my-3'>
                                <Form.Select aria-label="Default select example">
                                    <option>Field</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </Form.Select>
                            </Col>
                        </Row>
                            </>
                        )}

                        <Row className='d-flex justify-content-center my-3'>
                            <Col className='col-4 d-flex justify-content-center'>
                                <Button variant="primary" type="submit">
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