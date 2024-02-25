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

    const [appointment, setAppointment] = useState([
        
    ])

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
            <Modal.Title>Book your appointment with {companyDetails.company_name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form>
            {['radio'].map((radio) => (
                <div key={`inline-${radio}`} className="mb-3">
                <Form.Check
                    inline
                    label="26/06/2024"
                    name="group1"
                    type={radio}
                    id={`inline-${radio}-1`}
                />
                <Form.Check
                    inline
                    label="27.06.2024"
                    name="group1"
                    type={radio}
                    id={`inline-${radio}-2`}
                />
                <Form.Check
                    inline
                    label="28.06.2024"
                    type={radio}
                    id={`inline-${radio}-3`}
                />
                <Form.Select aria-label="Default select example">
                    <option>Select the time</option>
                    <option value="1">09:00-10:00</option>
                    <option value="1">10:00-11:00</option>
                    <option value="1">11:00-12:00</option>
                    <option value="1">12:00-13:00</option>
                    <option value="1">14:00-15:00</option>
                    <option value="1">15:00-16:00</option>
                    <option value="1">16:00-17:00</option>
                    <option value="1">18:00-19:00</option>
                </Form.Select>
                </div>
                
            ))}
            </Form>
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