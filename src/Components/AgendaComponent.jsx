import { Card, Col, Container, Row } from "react-bootstrap"
import NavBarComp from "./NavBarComponent"
import '../Home.css';

function AgendaComp(){
    return (
        <Container>
            <NavBarComp />
            <Row>
                <Col className="d-flex justify-content-center">
                    <h1 className="text-white">Your agenda</h1>
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
                                    Date
                                </Card.Text>
                                <Card.Text className="m-0">
                                    Hour
                                </Card.Text>
                            </Container>
                        </Card.Body>
                    </Card>
                    {/* <Row className="text-white">
                        <Col className="col-4 p-0">
                            <img src="https://cdn.shopify.com/s/files/1/1395/5787/files/mola_2_abstract_1950s_1024x1024.jpg?v=1613952286g" className='rounded w-25' alt='logo' />
                        </Col>
                        <Col >
                            <h5>Company name</h5>
                        </Col>
                        <Col className="col-2 p-0">
                            <h5>More info</h5>
                        </Col>
                        <Col className="col-1 p-0">
                            <h5>SAVE</h5>
                        </Col>
                    </Row> */}
                </Col>
            </Row>
        </Container>
    )
}

export default AgendaComp