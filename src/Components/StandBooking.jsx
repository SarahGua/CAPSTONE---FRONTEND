import { useEffect, useState } from "react"
import {Alert, Button, Card, Col, Container, Modal, Row } from "react-bootstrap"
import '../Home.css';
import NavBarComp from "./NavBarComponent";

function StandBooking(){

    const [standList, setStandList] = useState([])

    const [bookingSuccess, setBookingSuccess] = useState(false);

    const [buttonClick, setButtonClick] = useState(false)

    const [show, setShow] = useState(false);

    const [user, setUser] = useState([])

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [alertShow, setAlertShow] = useState(false);

    const [selectedStand, setSelectedStand] = useState(null)

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


    const getStands = () => {
        const token = localStorage.getItem('token')
        fetch(process.env.REACT_APP_BE_URL + "/stand", {
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
            setStandList(data)
            console.log(data)
        })
        .catch((err) => {
            console.log('Errore', err)
        })
    }

    const confirmBooking = (standId) => {
        const token = localStorage.getItem('token')
        console.log(token)
        console.log('standId:', standId)
        const userId = user.id
        console.log('questo è lo userId:', userId)
        const dataToBeSent = {
            userId: user.id,
            standId: standId
        }

        fetch(process.env.REACT_APP_BE_URL + `/stand/bookstand/${standId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToBeSent)
        })
        .then((res) => {
            if(res.ok){
                setBookingSuccess(true)
                handleClose(); 
            } else {
                throw new Error('Errore nella prenotazione dello stand');
            }
        })
        .catch((err) => {
            console.log('Errore', err);
        });
    }

    useEffect(() => {
        getStands()
        getUserProfile()
    }, [])

    return (
        <Container>
            <NavBarComp />
                            {/* -------------------alert success booking----------------- */}
                            {
                    bookingSuccess && 
                <Alert className="d-flex justify-content-center">
                Booth successfully booked. Go to your profile page to get all the info!
                </Alert>
                }
                <Card className="my-5 bg-darkBlue text-similWhite">
                    <Card.Body>
                        <Row>
                            {
                                standList.map((stand) => {
                                    return (
                                        <Col className="col-sm-12 col-md-6 col-lg-3 my-2" key={stand.id}>
                                            <Card>
                                                    <Card.Body className="d-flex flex-column align-items-center bg-darkBlue text-similWhite rounded">
                                                        <Card.Title>Book your stand!</Card.Title>
                                                        <Card.Text className="d-flex flex-column align-items-center m-0"> 
                                                        <span>Dimensions: {stand.dimensions}</span>
                                                        <span>Price: {stand.cost}</span>
                                                        </Card.Text>
                                                        <Button variant={stand.status === 'AVAILABLE' ? "success" : "danger"} className="my-2" onClick={() => { console.log(stand.id); setSelectedStand(stand.id); handleShow(); }}>BOOK IT</Button>
                                                    </Card.Body>
                                            </Card>
                                        </Col>
                                    )
                                })
                            }
                        </Row>
                    </Card.Body>
                </Card>

                {/* ---------------------modale--------------------- */}
                <Modal show={show} onHide={handleClose} className='bg-darkBlue text-white'>
                    <Modal.Header closeButton className='border border-0 buttonLogIn'>
                    <Modal.Title>Are you sure yu want to book this stand?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='border border-0 buttonLogIn'>Click on confirm if you are sure!</Modal.Body>
                        <Modal.Footer className='border border-0 buttonLogIn'>
                            <Button variant="success" onClick={() => confirmBooking(selectedStand)} className='bg-darkBlue border border-0'>
                                Confirm
                            </Button>
                        </Modal.Footer>
                </Modal>
        </Container>
    )
}

export default StandBooking