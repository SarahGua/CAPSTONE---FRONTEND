import { useEffect, useState } from "react"
import {Button, Card, Col, Container, Modal, Row } from "react-bootstrap"
import '../Home.css';
import NavBarComp from "./NavBarComponent";

function StandBooking(){

    const [standList, setStandList] = useState([])

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

        fetch(process.env.REACT_APP_BE_URL + `/stand/bookstand/${standId}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user.id)
        })
        .then((res) => {
            if(res.ok){
                // setAlertShow(true)
                // setShow(true)
                handleClose(); 
            } else {
                // setAlertShow(false)
                // setShow(true)
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
                <Card className="my-5 bg-darkBlue text-similWhite">
                    <Card.Body>
                        <Row>
                            {
                                standList.map((stand) => {
                                    return (
                                        <Col className="col-sm-12 col-md-6 col-lg-3 my-2" key={stand.id}>
                                            <Card
                                                // className={`${buttonClick ? 'card-clicked' : ''}`}
                                                // onClick={() => setButtonClick}
                                            >
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
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Are you sure yu want to book this stand?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Click on confirm if you are sure!</Modal.Body>
                        <Modal.Footer>
                            <Button variant="success" onClick={() => confirmBooking(selectedStand)}>
                                Confirm
                            </Button>
                        </Modal.Footer>
                        {/* ------------------------Alert------------------------------ */}
                        {/* {alertShow === true && 
                            <Alert variant="success" onClose={() => alertShow(null)} dismissible>
                                Stand booked successfully!
                            </Alert>
                        }
                        {alertShow === false && 
                            <Alert variant="danger" onClose={() => alertShow(null)} dismissible>
                                Error booking the stand!
                            </Alert>
                        } */}
                </Modal>

        </Container>
    )
}

export default StandBooking