import { Button, Card, Col, Container, Form, Modal, Row } from "react-bootstrap"
import NavBarComp from "./NavBarComponent"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Profile(){

    const [show, setShow] = useState(false);

    const handleClose = () => {setShow(false)};    
    const handleShow = () => setShow(true);

    const [user, setUser] = useState([])

    const [field, setField] = useState([])

    const [formData, setFormData] = useState({
        name: user.name || '',
        surname: user.surname || '',
        phone: user.phone_number || '',
        company_name: user.company_name || '',
        company_email: user.company_email || '',
        company_phone_number: user.company_phone_number || '',
        vat: user.vat || '',
        address: user.address || '',
        field: user.field || ''
    })

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
            console.log(user.vat)
            
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
            console.log(data)
        })
        .catch((err) => {
            console.log('Errore', err)
        })
    }
    
    useEffect(() => {
        getUserProfile()
        getField()
    }, [])

    useEffect(() => {
        setFormData({
            name: user.name || '',
            surname: user.surname || '',
            phone_number: user.phone_number || '',
            company_name: user.company_name || '',
            company_email: user.company_email || '',
            company_phone_number: user.company_phone_number || '',
            vat: user.vat || '',
            address: user.address || '',
            field: field.user || ''
        });
        console.log('ecco la VAT:', formData.vat)
        console.log('ecco la user.vat:', user.vat)
        console.log('ecco il formData.field:', formData.field)
        console.log('ecco il user.field:', user.field)

    }, [user]);

    const handleChange = (e) => {
        setFormData({...formData, 
        [e.target.name]: e.target.value
    })
    }

    const handleSaveChanges = () => {

        const selectedField = field.find(f => f.description === formData.field)
        console.log('questo è il selectedField:', selectedField)
        if(selectedField){
            selectedField.users.push(user)
            const updatedFieldList = field.map(f => f.id === selectedField.id ? selectedField : f)
            console.log('questa è la nuova lista di field:',  updatedFieldList)
            setField(updatedFieldList)
        }

        const token = localStorage.getItem('token');
        fetch(process.env.REACT_APP_BE_URL + `/user/${user.id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then((res) => {
            if(res.ok){
                console.log('ecco lo user:', user)
                getUserProfile();
                handleClose();
            } else {
                throw new Error('Errore durante il salvataggio dei dati');
            }
        })
        .catch((err) => console.log(err));
    };

    return (
        <Container>
            <NavBarComp />
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
                            {user && user.role === 'EXHIBITOR' && (
                                                    <Card.Text>
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
                                                                        Company VAT: {user.vat}
                                                                    </Col>
                                                                    <Col>
                                                                        Field: {formData.field}
                                                                    </Col>
                                                                </Row> 
                                                            </Card.Body>
                                                        </Card>
                                                    </Card.Text>
                            )}
                                                            <Row className="mb-3">
                                    <Col className="d-flex flex-column align-items-center">
                                        <Button variant="info" className="mb-2">Check you agenda!</Button>
                                        <Button variant="secondary" onClick={handleShow}>Modify your profile</Button>
                                        {
                                            user && user.role === 'EXHIBITOR' ? (
                                                <Link to={`/standBooking`}>                                               
                                                    <Button variant="info" className="mb-2">Book your stand!</Button>
                                                </Link>
                                            ) : (
                                                <Link to="/ticket">                                               
                                                    <Button variant="info" className="mb-2">Book your ticket!</Button>
                                                </Link>
                                            )
                                        }
                                    </Col>
                                </Row>   
                    </Card.Text>
                </Card.Body>
            </Card>
                {/* -------------------------- card per espositore ------------------------- */}
                {/* modale per modificare profilo */}
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>You want to modify your profile?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Name"
                                    autoFocus
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Surname</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Surname"
                                    autoFocus
                                    name="surname"
                                    value={formData.surname}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Phone number</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="+39 333 3333333"
                                    autoFocus
                                    name="phone_number"
                                    value={formData.phone_number}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                    </Form>
                        {user.role === 'EXHIBITOR' && (
                                                    <Form>                                                  
                                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                        <h4>Company informtion</h4>
                                                        <Form.Label>Company name</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            placeholder="+39 333 3333333"
                                                            autoFocus
                                                            name="company_name"
                                                            value={formData.company_name}
                                                            onChange={handleChange}
                                                        />
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                        <Form.Label>company email</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            placeholder="+39 333 3333333"
                                                            autoFocus
                                                            name="company_email"
                                                            value={formData.company_email}
                                                            onChange={handleChange}
                                                        />
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                        <Form.Label>Company phone number</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            placeholder="+39 333 3333333"
                                                            autoFocus
                                                            name="company_phone_number"
                                                            value={formData.company_phone_number}
                                                            onChange={handleChange}
                                                        />
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                        <Form.Label>Address</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            placeholder="+39 333 3333333"
                                                            autoFocus
                                                            name="address"
                                                            value={formData.address}
                                                            onChange={handleChange}
                                                        />
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                        <Form.Label>VAT</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            placeholder="VAT"
                                                            autoFocus
                                                            name="vat"
                                                            value={formData.vat}
                                                            onChange={handleChange}
                                                        />
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                        <Form.Label>Field</Form.Label>
                                                        <Form.Select 
                                                        aria-label="Default select example"
                                                        name="field"
                                                        value={formData.field}
                                                        onChange={handleChange}
                                                        >
                                                            <option>Select field</option>
                                                            {
                                                                field.map((f) => {
                                                                    return (
                                                                        <option 
                                                                        value={f.description} 
                                                                        name='field'
                                                                        key={f.id} 
                                                                        // onChange={handleChange}
                                                                        >{f.description}
                                                                        </option>
                                                                    )
                                                                })
                                                            }
                                                        </Form.Select>
                                                    </Form.Group>
                                            </Form>
                        )}

                    </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={() => {handleClose(); handleSaveChanges();}}>
                                Save Changes
                            </Button>
                        </Modal.Footer>
                </Modal>
        </Container>
    )
}

export default Profile