import { CardText, Col, Container, Row } from "react-bootstrap"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import NavBarComp from "./NavBarComponent";

function ExhibitorProfile(){
    return(
        <Container>

        <NavBarComp />
        <Row className="vh-100 d-flex align-items-center">
            <Col>
                <Card className="m-5 d-flex flex-row">
                    {/* <Card.Img variant="top" src="https://brasaperuvian.com/cdn/shop/articles/iStock-468588494_2000x.jpg?v=1657045235" className="w-50"/> */}
                    <Row>
                        <Col className="d-flex justify-content-center align-items-center col-4">
                            <img src="https://cdn.shopify.com/s/files/1/1395/5787/files/mola_2_abstract_1950s_1024x1024.jpg?v=1613952286g" className='w-75 vh-50' alt='logo'/>
                        </Col>
                        <Col>
                            <Card.Body className="d-flex flex-column justify-content-around align-items-center">
                                <Card.Title className="d-flex justify-content-center mb-5">Company name</Card.Title>
                                <Card.Text className="d-flex justify-content-center mb-5">
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nesciunt accusantium amet exercitationem ratione! 
                                Ipsam fuga doloremque molestias sunt eligendi architecto inventore eius aliquid dignissimos. Magni veniam delectus perferendis 
                                impedit voluptates.
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nesciunt accusantium amet exercitationem ratione! 
                                Ipsam fuga doloremque molestias sunt eligendi architecto inventore eius aliquid dignissimos. Magni veniam delectus perferendis 
                                impedit voluptates.
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nesciunt accusantium amet exercitationem ratione! 
                                Ipsam fuga doloremque molestias sunt eligendi architecto inventore eius aliquid dignissimos. Magni veniam delectus perferendis 
                                impedit voluptates.
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nesciunt accusantium amet exercitationem ratione! 
                                Ipsam fuga doloremque molestias sunt eligendi architecto inventore eius aliquid dignissimos. Magni veniam delectus perferendis 
                                impedit voluptates.
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nesciunt accusantium amet exercitationem ratione! 
                                Ipsam fuga doloremque molestias sunt eligendi architecto inventore eius aliquid dignissimos. Magni veniam delectus perferendis 
                                impedit voluptates.s.
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nesciunt accusantium amet exercitationem ratione! 
                                Ipsam fuga doloremque molestias sunt eligendi architecto inventore eius aliquid dignissimos. Magni veniam delectus perferendis 
                                impedit voluptates.s.
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nesciunt accusantium amet exercitationem ratione! 
                                Ipsam fuga doloremque molestias sunt eligendi architecto inventore eius aliquid dignissimos. Magni veniam delectus perferendis 
                                impedit voluptates.s.
                                </Card.Text>
                                <CardText>Meet us at boot number xxx</CardText>
                                <Button variant="primary" className="w-50">Book an appointment</Button>
                            </Card.Body>
                        </Col>
                    </Row>
                </Card>
            </Col>
        </Row>
        </Container>
    )
}

export default ExhibitorProfile