import { CardText, Col, Container, Modal, Row } from "react-bootstrap"
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
            console.log('questa è lazienda: ' + JSON.stringify(companyDetails))
        })
        .catch((e) => console.log('errore' + e))
    }

    useEffect(() => {
            getDetails()
    }, [id])


    return(
        <Container>
        <NavBarComp />
        <Row className="d-flex justify-content-center">
            <Col className="col-md-10 col-sm-8 col-xs-6">
                <Card>
                    <Card.Body>
                        <div className="d-flex align-items-center justify-content-center mb-5">
                            <img src="https://cdn.shopify.com/s/files/1/1395/5787/files/mola_2_abstract_1950s_1024x1024.jpg?v=1613952286g" className='rounded w-25 me-3' alt='profile-img'/>
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
        </Row>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Book your appointment with xxx</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
                Save Changes
            </Button>
            </Modal.Footer>
        </Modal>
        </Container>
    )
}

export default ExhibitorProfile