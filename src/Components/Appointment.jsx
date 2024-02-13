import { Button, Card, Col, Container, Row } from "react-bootstrap"
import NavBarComp from "./NavBarComponent"

function Appointment(){
    return (
        <Container>
            <NavBarComp />
            <Row>
            <Col className="d-flex justify-content-center">
                <h1 className="text-white">Your agenda</h1>
            </Col>
            </Row>

            <Row className="mt-5">
                <Col>
                    <Card border="info">
                        <Card.Body className="d-flex flex-column align-items-center">
                        <Card.Title>Date - Hour</Card.Title>
                        <Button variant="primary">Book!</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card border="info">
                        <Card.Body className="d-flex flex-column align-items-center">
                        <Card.Title>Date - Hour</Card.Title>
                        <Button variant="primary">Book!</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row className="mt-3">
                <Col>
                    <Card border="info">
                        <Card.Body className="d-flex flex-column align-items-center">
                        <Card.Title>Date - Hour</Card.Title>
                        <Button variant="primary">Book!</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card border="info">
                        <Card.Body className="d-flex flex-column align-items-center">
                        <Card.Title>Date - Hour</Card.Title>
                        <Button variant="primary">Book!</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Appointment