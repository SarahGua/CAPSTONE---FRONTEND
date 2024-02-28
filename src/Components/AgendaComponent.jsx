import { Alert, Card, Col, Container, Row } from "react-bootstrap"
import NavBarComp from "./NavBarComponent"
import '../Home.css';
import { useEffect, useState } from "react";
import { Trash3 } from "react-bootstrap-icons"

function AgendaComp(){

    const [appointments, setAppointments] = useState([])

    const [user, setUser] = useState([])

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
            setAppointments(data)
        })
        .catch((e) => console.log('questo è l errore', e)) 
    }

    const handleDeleteAppointment = (id) => {
        const token = localStorage.getItem('token')

        fetch(`${process.env.REACT_APP_BE_URL}/appointment/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .then((res) => {
            if(res.ok){
                getAppointments();
            } else {
                throw new Error('Errore durante l\'eliminazione dell\'appuntamento')
            }
        })
        .catch((err) => console.log(err, "errore"))
    }

    useEffect(() => {
        getAppointments()
        console.log("questi sono gli appointment", appointments)
        console.log('user.id', user.id)
        // console.log('client.id', appointments.client.id)
        getUserProfile()
        console.log(user)
    }, []) 


    return (
        <Container>
            <NavBarComp />
            <Row>
                <Col className="d-flex justify-content-center">
                    <h1 className="text-white">Your agenda</h1>
                </Col>
            </Row>

            {/* cards */}
            {
                user.role === "CLIENT" ? (
                <Row className="mt-5 d-flex justify-content-center">
                    {
                        appointments
                        .filter(app => app.client.id === user.id)
                        .map((app) => (
                            <Col className="col-12 my-3" key={app.id}>             
                            <Card className="d-flex flex-row bg-darkBlue text-white">
                                <Card.Img variant="top" src={app.exhibitor.img_url} className="h-15" />
                                <Card.Body className="d-flex justify-content-between">
                                    <Container className="d-flex justify-content-start align-items-center">
        
                                    <Card.Title className="m-0">{app.exhibitor.company_name}</Card.Title>
                                    </Container>
                                    <Container className="d-flex justify-content-end align-items-center">
                                        <Card.Text className="m-0 me-3">
                                            {app.date}
                                        </Card.Text>
                                        <Card.Text className="m-0 me-3">
                                            {app.time}
                                        </Card.Text>
                                        <Card.Text>
                                            <Trash3 onClick={() => handleDeleteAppointment(app.id)}></Trash3>
                                        </Card.Text>
                                    </Container>
                                </Card.Body>
                            </Card>
                        </Col>
                        )             
                    )}
                    {
                        appointments.some(app => app.client.id === user.id) ? null : (
                            <Col className="col-6">
                                <Alert variant="info" className="buttonLogIn text-white border border-0 d-flex justify-content-center">
                                    <p className="m-0">
                                        No appintments scheduled!
                                    </p>
                                </Alert>
                            </Col>
                        )
                    }
                </Row>
                ) : (
                    <Row className="mt-5 d-flex justify-content-center">
                    {
                        appointments
                        .filter(app => app.exhibitor.id === user.id)
                        .map((app) => (
                            <Col className="col-12" key={app.id}>             
                            <Card className="d-flex flex-row bg-darkBlue text-white">
                                <Card.Img variant="top" src={app.client.img_url} className="h-15" />
                                <Card.Body className="d-flex justify-content-between">
                                    <Container className="d-flex justify-content-start align-items-center">
        
                                    <Card.Title className="m-0">{app.client.name}</Card.Title>
                                    </Container>
                                    <Container className="d-flex justify-content-end align-items-center">
                                        <Card.Text className="m-0 me-3">
                                            {app.date}
                                        </Card.Text>
                                        <Card.Text className="m-0 me-3">
                                            {app.time}
                                        </Card.Text>
                                        <Card.Text>
                                            <Trash3 onClick={() => handleDeleteAppointment(app.id)}></Trash3>
                                        </Card.Text>
                                    </Container>
                                </Card.Body>
                            </Card>
                        </Col>
                        )             
                    )}
                    {
                        appointments.some(app => app.exhibitor.id === user.id) ? null : (
                            <Col className="col-6">
                                    <Alert variant="info" className="buttonLogIn text-white border border-0 d-flex justify-content-center">
                                        <p className="m-0">
                                            No appintments scheduled!
                                        </p>
                                    </Alert>
                            </Col>
                        )
                    }
                </Row>
                )
            }
        </Container>
    )
}

export default AgendaComp