import { CardText, Col, Container, Form, Modal, Row } from "react-bootstrap"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import NavBarComp from "./NavBarComponent";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function ExhibitorProfile(){

    const {id} = useParams()

    const [companyDetails, setCompanyDetails] = useState('')

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [user, setUser] = useState([])

    const [allAppointments, setAllAppointments] = useState([])

    const [selectedAppointment, setSelectedAppointment] = useState({
            date: '',
            time: '',
            clientId: user.id,
            exhibitorId: id
    })

    const handleInputChange = (e) => {
        if(e.target.type === "radio" && e.target.checked){
            setSelectedAppointment(prevState => ({
                ...prevState,
                date: e.target.value
            }))
        }

        setSelectedAppointment(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }


        
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

    const getDetails = () => {
        console.log('parametri', id)
        const token = localStorage.getItem('token')
        console.log(id)
        fetch(`${process.env.REACT_APP_BE_URL}/user/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }) 
        .then((res) => {
            if(res.ok){
                return res.json()
            } else {
                throw new Error('errore nel recupero dettagli azienda')
            }
        })
        .then((data) => {
            console.log(data)
            setCompanyDetails(data)
        })
        .catch((e) => console.log('errore' + e))
    }

    useEffect(() => {
            getDetails()
            getUserProfile()
            getAppointments()
            console.log('questo è lo user', user)
            console.log("questi sono gli appointment", )
    }, [id])

    const getAppointments = () => {
        const token = localStorage.getItem('token')

        fetch(`${process.env.REACT_APP_BE_URL}/appointment`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        })
        .then((res) => {
            if(res.ok){
                return res.json()
            } else {
                throw new Error('errore nel caricamento dei dati')
            }
        })
        .then((data) => {
            console.log(data)
            setAllAppointments(data)
        })
        .catch((e) => console.log('questo è l errore', e)) 
    }

    const bookAppointment = () => {
        const token = localStorage.getItem('token')
        console.log('questo è il parameter exhibitor id', id)

        const dataToBookApp = {
            date: selectedAppointment.date,
            time: selectedAppointment.time,
            exhibitorId: id,
            clientId: user.id
        }
        console.log(dataToBookApp)

        fetch(`${process.env.REACT_APP_BE_URL}/appointment/book/${id}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToBookApp)
        })
        .then((res) => {
            if(res.ok){
                return res.json()
            } else {
                throw new Error('errore nel caricamento dei dati')
            }
        })
        .catch((e) => console.log('questo è l errore', e)) 
    }

    const handleSaveChanges = () => {
        bookAppointment()
        handleClose()
        window.location.reload()
    }


    return(
        <Container>
        <NavBarComp/>
        {/* <Row className="d-flex justify-content-center">
            <Col className="col-md-10 col-sm-8 col-xs-6">
                <Card className="bg-darkBlue border border-0">
                    <Card.Body>
                        <div className="d-flex align-items-center justify-content-center mb-5">
                            <img src={companyDetails.img_url} className='rounded w-25 me-3' alt='profile-img'/>
                            <Card.Title>{companyDetails.company_name}</Card.Title>
                        </div>
                        <Card.Text className="d-flex justfy-content-around align-items-center">
                            <Card border="info">
                                <Card.Body >
                                    <Card.Title>Information</Card.Title>
                                    <Container>
                                    <Row>
                                        <Col className="d-flex flex-colummn align-items-center">
                                            <Card.Text className="m-0">
                                                NAME: {companyDetails.company_name}
                                            </Card.Text>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="d-flex flex-colummn align-items-center">
                                            <Card.Text className="m-0">
                                                EMAIL: {companyDetails.company_email}
                                            </Card.Text>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="d-flex flex-colummn align-items-center">
                                            <Card.Text className="m-0">
                                                ADDRESS: {companyDetails.address}
                                            </Card.Text>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="d-flex flex-colummn align-items-center">
                                            <Card.Text className="m-0">
                                                PHONE NUMBER: {companyDetails.company_phone_number}
                                            </Card.Text>
                                        </Col>
                                    </Row>
                                    </Container>
                                </Card.Body>
                            </Card>
                            <Button variant="info" className="vh-25" onClick={handleShow}>Book an appointment!</Button>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
        </Row> */}

        <Row className="text-similWhite d-flex align-items-center mt-5">
            <Col className="col-4 d-flex align-items-center">
                <img src={companyDetails.img_url} className='rounded w-100 me-3' alt='profile-img'/>
            </Col>
            <Col>
                <Row>
                    <Col className="col-12 d-flex justify-content-center my-5">
                        <h1>{companyDetails.company_name}</h1>
                    </Col>
                    <Col>
                    <Card.Body className="mt-5">
                        <Card.Title className="my-3 d-flex justify-content-center fs-3">Information</Card.Title>
                            <Container className="p-0 d-flex flex-column align-items-center">
                                <Row className="mb-1">
                                    <Col className="d-flex flex-colummn align-items-center">
                                        <Card.Text className="m-0">
                                            NAME: {companyDetails.company_name}
                                        </Card.Text>
                                    </Col>
                                </Row>
                                <Row className="mb-1">
                                    <Col className="d-flex flex-colummn align-items-center">
                                        <Card.Text className="m-0">
                                            EMAIL: {companyDetails.company_email}
                                        </Card.Text>
                                    </Col>
                                </Row>
                                <Row className="mb-1">
                                    <Col className="d-flex flex-colummn align-items-center">
                                        <Card.Text className="m-0">
                                            ADDRESS: {companyDetails.address}
                                        </Card.Text>
                                    </Col>
                                </Row>
                                <Row className="mb-1">
                                    <Col className="d-flex flex-colummn align-items-center">
                                        <Card.Text className="m-0 mb-3">
                                            PHONE NUMBER: {companyDetails.company_phone_number}
                                        </Card.Text>
                                    </Col>
                                </Row>
                                <Row className="mt-5">
                                <Col className="d-flex justify-content-center mb-3">
                                    <h2>{companyDetails.stand ? `You can find us at our booth number ${companyDetails.stand.position}`  : 'booth to be defined'}</h2>
                                </Col>
                                </Row>
                            </Container>
                        </Card.Body>
                    </Col>
                </Row>
                <Row className="mb-5">
                    <Col className="d-flex justify-content-center">
                        <Button variant="info" className="vh-25 border border-lightn bg-transparent border-3 text-white" onClick={handleShow}>Book an appointment!</Button>
                    </Col>
                </Row>
            </Col>
        </Row>

        <Modal show={show} onHide={handleClose} className="bg-darkBlue text-similWhite">
            <Modal.Header closeButton className='border border-0 buttonLogIn'>
            <Modal.Title>Book your appointment with {companyDetails.company_name}</Modal.Title>
            </Modal.Header>
            <Modal.Body className='border border-0 buttonLogIn d-flex justify-content-center'>
            <Form>
            {['radio'].map((radio) => (
                <div key={`inline-${radio}`} className="mb-3">
                <Form.Check
                    inline
                    label="26/06/2024"
                    name="date"
                    type={radio}
                    id={`inline-${radio}-1`}
                    value="26.06.2024"
                    onChange={handleInputChange}
                />
                <Form.Check
                    inline
                    label="27.06.2024"
                    name="date"
                    type={radio}
                    id={`inline-${radio}-2`}
                    value="27.06.2024"
                    onChange={handleInputChange}
                />
                <Form.Check
                    inline
                    label="28.06.2024"
                    name="date"
                    type={radio}
                    id={`inline-${radio}-3`}
                    value="28.06.2024"
                    onChange={handleInputChange}
                />
                <Form.Select aria-label="Default select example" name="time" onChange={handleInputChange} className="mt-2">
                    <option>Select the time</option>
                    {['09:00-10:00', '10:00-11:00', '11:00-12:00', '12:00-13:00', '14:00-15:00', '15:00-16:00', '16:00-17:00', '18:00-19:00'].map((timeSlot) => {
                        const appointmentExists = allAppointments.some(appointment => 
                            appointment.exhibitor.id === id && 
                            appointment.date === appointment.date && 
                            appointment.time === timeSlot && 
                            appointment.status === 'BOOKED' &&
                            appointment.date === selectedAppointment.date
                        );
                        return <option key={timeSlot} value={timeSlot} disabled={appointmentExists}>{timeSlot}</option>;
                    })}
                </Form.Select>
                </div>
                
            ))}
            </Form>
            </Modal.Body>
            <Modal.Footer className='border border-0 buttonLogIn'>
            <Button variant="primary" onClick={handleSaveChanges} className='bg-darkBlue border border-0'>
                Save Changes
            </Button>
            </Modal.Footer>
        </Modal>
        </Container>
    )
}

export default ExhibitorProfile