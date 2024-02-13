import { Card, Col, Container, Row } from "react-bootstrap"
import NavBarComp from "./NavBarComponent"
import Form from 'react-bootstrap/Form';
import '../Home.css';
import { Link } from "react-router-dom";
import { SuitHeartFill } from 'react-bootstrap-icons';
import { useState } from 'react';

function ExhibitorListComp(){

    // const [wishList, setWishList] = useState([]);

    // const addToWishList = (companyName) => {
    //     setWishList([...wishList, companyName]);
    // };

    return(
        <Container>
            <NavBarComp />
            <Row>
                <Col className="d-flex justify-content-center">
                    <h1 className="text-white">Exhibitors List</h1>
                </Col>
            </Row>

            <Row className="mt-3">
                <Col>
                    <Form.Control type="text" placeholder="Name" />
                </Col>
                <Col>
                    <Form.Select aria-label="Default select example">
                        <option>Field</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </Form.Select>
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
                                <Link to="/profile" className=" text-decoration-none">
                                    <Card.Text className="m-0 me-3" style={{color:'black'}}>
                                        More Info
                                    </Card.Text>
                                </Link>
                                <Card.Text className="m-0">
                                <SuitHeartFill className="iconSave d-flex align-items-center" 
                                // onClick={() => addToWishList("Company name")}
                                />
                                </Card.Text>
                            </Container>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default ExhibitorListComp