import { Button, Card, Col, Container, Row } from "react-bootstrap"
import NavBarComp from "./NavBarComponent"
import '../Home.css';

function WishList(){
    return (
        <Container>
        <NavBarComp />
        <Row>
            <Col className="d-flex justify-content-center">
                <h1 className="text-white">Wish List</h1>
            </Col>
        </Row>

        {/* cards */}
        <Row className="mt-5">
            <Col>             
                <Card className="d-flex flex-row">
                    <Card.Img variant="top" src="https://brasaperuvian.com/cdn/shop/articles/iStock-468588494_2000x.jpg?v=1657045235" className="h-15" />
                    <Card.Body className="d-flex justify-content-between">
                        <Container className="d-flex justify-content-start align-items-center">

                        <Card.Title className="m-0">Company name</Card.Title>
                        </Container>
                        <Container className="d-flex justify-content-end align-items-center">
                            <Card.Text className="m-0 me-3">
                                More info
                            </Card.Text>
                            <Card.Text className="m-0">
                                SAVE
                            </Card.Text>
                        </Container>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    </Container>
    )
}

export default WishList