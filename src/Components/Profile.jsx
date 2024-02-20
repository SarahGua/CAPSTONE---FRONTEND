import { Button, Card, Col, Container, Form, Modal, Row } from "react-bootstrap"
import NavBarComp from "./NavBarComponent"
import { useEffect, useState } from "react";

function Profile(){

    const [show, setShow] = useState(false);

    const handleClose = () => {setShow(false)};    
    const handleShow = () => setShow(true);

    const [user, setUser] = useState([])

    const [field, setField] = useState([])

    // const updateProfile = () => {
    //     const token = localStorage.getItem('token')
    //     console.log(user.id)
    //     fetch(process.env.REACT_APP_BE_URL + `/user/${user.id}`, {
    //         method: 'PUT',
    //         headers: {
    //             'Authorization': `Bearer ${token}`,
    //             'Content-Type': 'application/json'
    //         }
    //     })
    // }

    const getUserProfile = () => {
        const token = localStorage.getItem('token')

        console.log(token)

        fetch(process.env.REACT_APP_BE_URL + `/user/token/${token}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .then((res) => {
            if(res.ok){
                return res.json()
            } else {
                throw new Error('Errore nel recupero dati')
            }
        })
        .then((data) => {
            console.log(data)
            setUser(data)
            
        })
        .catch((err) => console.log(err, "errore"))
    }
    
    
    
    const getField = () => {
        const token = localStorage.getItem('token')
        fetch(process.env.REACT_APP_BE_URL + "/field", {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .then((res) => {
            if(res.ok){
                return res.json()
            } else {
                throw new Error('Errore nel recupero dati')
            }
        })
        .then((data) => {
            setField(data)
        })
        .catch((err) => {
            console.log('Errore', err)
        })
    }
    
    useEffect(() => {
        console.log('questo è lo user settato:' + user)
        getUserProfile()
        getField()
    }, [])

    console.log('questo è lo user settato:' + user)

    return (
        <Container>
            <NavBarComp />
            {user.role === 'EXHIBITOR' ? (
                                <Card>
                                <Card.Body>
                                    <div className="d-flex align-items-center justify-content-center mb-5 mt-3">
                                    <img src="https://cdn.shopify.com/s/files/1/1395/5787/files/mola_2_abstract_1950s_1024x1024.jpg?v=1613952286g" className='rounded w-25 me-3' alt='profile-img'/>
                                    <Card.Title>{user.name}</Card.Title>
                                    </div>
                                    <Card.Text>
                                        <Card border="info">
                                            <Card.Body>
                                                <Row className="mb-5">
                                                <h3 className="mb-4">Personal information</h3>
                                                    <Col>
                                                        Name: {user.name}
                                                    </Col>
                                                    <Col>
                                                        Surname: {user.surname}
                                                    </Col>
                                                </Row>
                                                <Row className="mb-5">
                                                    <Col>
                                                        Email: {user.email}
                                                    </Col>
                                                    <Col>
                                                        Phone number: {user.phone_number}
                                                    </Col>
                                                </Row>
                                            </Card.Body>
                                        </Card>
                                        <Card border="info">
                                            <Card.Body>
                                                <Row className="mb-5">
                                                <h3 className="mb-4">Company information</h3>
                                                    <Col>
                                                        Company name: {user.company_name}
                                                    </Col>
                                                    <Col>
                                                        Company email: {user.company_email}
                                                    </Col>
                                                </Row>
                                                <Row className="mb-5">
                                                    <Col>
                                                        Company phone number: {user.company_phone_number}
                                                    </Col>
                                                    <Col>
                                                        Company complete address: {user.address}
                                                    </Col>
                                                </Row>
                                                <Row className="mb-5">
                                                    <Col>
                                                        Company VAT: {user.VAT}
                                                    </Col>
                                                    <Col>
                                                        {
                                                            field.map((f) => {
                                                                console.log(f)
                                                                console.log('questo è lo user: ' + user )
                                                                const isUserInField = f.users.some(userField => userField.id === user.id)
                                                                if(isUserInField){
                                                                    return (
                                                                        <Col key={f.id}>
                                                                        Field: {f.description}
                                                                        </Col>
                                                                    )
                                                                } 
                                                            })
                                                        }
                                                        {!field.some(f => f.users.some(userField => userField.id === user.id)) && (
                                                            <Col>
                                                                Field: campo da completare
                                                            </Col>
                                                        )}
                                                    {/* <Form.Select aria-label="Default select example">
                                                        <option>Open this select menu</option>
                                                        <option value="1">One</option>
                                                        <option value="2">Two</option>
                                                        <option value="3">Three</option>
                                                    </Form.Select> */}
                                                    </Col>
                                                </Row>
                                                <Row className="mb-3">
                                                    <Col className="d-flex flex-column align-items-center">
                                                        <Button variant="info" className="mb-2">Check you agenda!</Button>
                                                        <Button variant="secondary" onClick={handleShow}>Modify your profile</Button>
                                                    </Col>
                                                </Row>   
                                            </Card.Body>
                                        </Card>
                                    </Card.Text>
                                </Card.Body>
                                </Card>
            ) : ( 
                <Card>
                <Card.Body>
                    <div className="d-flex align-items-center justify-content-center mb-5 mt-3">
                    <img src="https://cdn.shopify.com/s/files/1/1395/5787/files/mola_2_abstract_1950s_1024x1024.jpg?v=1613952286g" className='rounded w-25 me-3' alt='profile-img'/>
                    <Card.Title>Your name</Card.Title>
                    </div>
                    <Card.Text>
                        <Card border="info">
                            <Card.Body>
                                <Row className="mb-5">
                                    <Col>
                                        Name: Sarah
                                    </Col>
                                    <Col>
                                        Surname: Guarneri
                                    </Col>
                                </Row>
                                <Row className="mb-5">
                                    <Col>
                                        Email: sarah@guarneri.it
                                    </Col>
                                    <Col>
                                        Phone number: 3319495603
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col className="d-flex flex-column align-items-center">
                                        <Button variant="info" className="mb-2">Check you agenda!</Button>
                                        <Button variant="secondary" onClick={handleShow}>Modify your profile</Button>
                                    </Col>
                                </Row>   
                            </Card.Body>
                        </Card>
                    </Card.Text>
                </Card.Body>
            </Card>
            )}
                {/* -------------------------- card per espositore ------------------------- */}
                {/* modale per modificare profilo */}
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>You want to modify your profile?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {user.role === 'EXHIBITOR' ? (
                                                    <Form>
                                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                        <h4>Personal information</h4>
                                                        <Form.Label>Name</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            placeholder="Name"
                                                            autoFocus
                                                            // value={profile.name}
                                                            // onChange={handleChange}
                                                        />
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                        <Form.Label>Surname</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            placeholder="Surname"
                                                            autoFocus
                                                            // value={profile.surname}
                                                            // onChange={handleChange}
                                                        />
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                        <Form.Label>Phone number</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            placeholder="+39 333 3333333"
                                                            autoFocus
                                                            // value={profile.phone_number || ''}
                                                            // onChange={handleChange}
                                                        />
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                        <h4>Company informtion</h4>
                                                        <Form.Label>Company name</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            placeholder="+39 333 3333333"
                                                            autoFocus
                                                            // value={profile.companyName || ''}
                                                            // onChange={handleChange}
                                                        />
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                        <Form.Label>company email</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            placeholder="+39 333 3333333"
                                                            autoFocus
                                                            // value={profile.companyEmail || ''}
                                                            // onChange={handleChange}
                                                        />
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                        <Form.Label>Company phone number</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            placeholder="+39 333 3333333"
                                                            autoFocus
                                                            // value={profile.companyPhone || ''}
                                                            // onChange={handleChange}
                                                        />
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                        <Form.Label>Address</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            placeholder="+39 333 3333333"
                                                            autoFocus
                                                            // value={profile.address || ''}
                                                            // onChange={handleChange}
                                                        />
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                        <Form.Label>VAT</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            placeholder="+39 333 3333333"
                                                            autoFocus
                                                            // value={profile.VAT || ''}
                                                            // onChange={handleChange}
                                                        />
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                        <Form.Label>Field</Form.Label>
                                                        <Form.Select aria-label="Default select example">
                                                            <option>Select field</option>
                                                            {
                                                                field.map((f) => {
                                                                    return (
                                                                        <option 
                                                                        value={f.description || ''} 
                                                                        key={f.id} 
                                                                        // onChange={handleChange}
                                                                        >{f.description}</option>
                                                                    )
                                                                })
                                                            }
                                                        </Form.Select>
                                                    </Form.Group>
                                            </Form>
                        ) : (
                            <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Name"
                                    autoFocus
                                    // value={name}
                                    // onChange={handleEmailChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Surname</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Surname"
                                    autoFocus
                                    // value={name}
                                    // onChange={handleEmailChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Phone number</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="+39 333 3333333"
                                    autoFocus
                                    // value={name}
                                    // onChange={handleEmailChange}
                                />
                            </Form.Group>
                    </Form>
                        )}

                    </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={handleClose}>
                                Save Changes
                            </Button>
                        </Modal.Footer>
                </Modal>
        </Container>
    )
}

export default Profile