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
    const [selectedField, setSelectedField] = useState('')

    const handleSelectedField = (e) => {
        setSelectedField(e.target.value)
    }
    
    useEffect(() => {
        console.log(selectedField)
    }, [selectedField])

    const [formData, setFormData] = useState({
        name: user.name || '',
        surname: user.surname || '',
        phone: user.phone_number || '',
        company_name: user.company_name || '',
        company_email: user.company_email || '',
        company_phone_number: user.company_phone_number || '',
        vat: user.vat || '',
        address: user.address || '',
        img_url: user.img_url 
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
            img_url: user.img_url 
        })
    }, [user]);

    const handleChange = (e) => {
        setFormData({...formData, 
        [e.target.name]: e.target.value
        })
    }

    const handleSaveChanges = () => {
        const token = localStorage.getItem('token');
        console.log('ecco lo user.id', user.id)

        if(user.role === 'EXHIBITOR'){          
            const selectedFieldObj = field.find(field => field.description === selectedField);
            console.log('ecco il selectedField.id', selectedFieldObj)
            console.log('ecco id del field', selectedFieldObj.id)

            fetch(process.env.REACT_APP_BE_URL + `/field/${selectedFieldObj.id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({userId: user.id})
            })
            .then((res) => {
                if(res.ok){
                    console.log('User added to field successfully');
                    getUserProfile();
                    handleClose();
                } else {
                    throw new Error('Error while saving data');
                }
            })
            .catch((err) => console.log(err));
        }

        const file = document.querySelector('#formFile').files[0];
        const formDataToSend = new FormData()


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


        if(file){
            formDataToSend.append('avatar', file)


            fetch(process.env.REACT_APP_BE_URL + `/user/${user.id}/uploadAvatar`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formDataToSend
            })
            .then((res) => {
                if(res.ok){
                    return res.text()
                } else {
                    throw new Error ('errore nel caricamentod dell immagine')
                }
            })
            .then((data) =>  {
                console.log('immagine caricata con successo', data)
                setUser(prevUser => ({
                    ...prevUser,
                    img_url: data.url
                }))
            })
            .then(() => {
                window.location.reload()
            })
            .catch((e) => console.log('errore:', e))
        }
    };

    return (
        <Container>
            <NavBarComp />
            <Card>
                <Card.Body>
                    <div className="d-flex align-items-center justify-content-center mb-5 mt-3">
                    <img src={user.img_url} className='rounded w-25 me-3' alt='profile-img'/>
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
                                                                    Field: {field.map((f) => {
                                                                        const userInField = f.users.find(fieldUser => fieldUser.id === user.id);
                                                                        return userInField ? f.description : null;
                                                                    })}
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
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>Profile picture</Form.Label>
                                <Form.Control 
                                type="file" 
                                accept="image/*"
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
                                                            placeholder="Company name"
                                                            autoFocus
                                                            name="company_name"
                                                            value={formData.company_name}
                                                            onChange={handleChange}
                                                        />
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                        <Form.Label>Company email</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            placeholder="Company email"
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
                                                            placeholder="Full address"
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
                                                        // name="field"
                                                        // value={''}
                                                        onChange={handleSelectedField}
                                                        >
                                                            <option>Select field</option>
                                                            {
                                                                field.map((f) => {
                                                                    return (
                                                                        <option 
                                                                        value={f.description} 
                                                                        // name='field'
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
                            <Button variant="primary" onClick={() => {handleSaveChanges()}}>
                                Save Changes
                            </Button>
                        </Modal.Footer>
                </Modal>
        </Container>
    )
}

export default Profile