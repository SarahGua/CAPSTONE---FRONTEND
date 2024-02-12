import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import '../Home.css';

function HomeComp(){
    return (
        <Container className='vh-100 d-flex flex-column justify-content-sm-evenly'>
            <Row>
                <Col>
                    {/* <img src="https://cdn.pixabay.com/photo/2017/03/16/21/18/logo-2150297_640.png" className='rounded w-25 d-flex' alt='logo'/> */}
                    <h6 className='text-white'>EpiConnect</h6>
                </Col>
            </Row>
            <Row>
                <Col className='d-flex align-items-center text-white'>
                    <h1>Transforming the World of Textile</h1>
                </Col>
                <Col className='d-flex align-items-center '>
                    <img src="https://cdn.shopify.com/s/files/1/1395/5787/files/mola_2_abstract_1950s_1024x1024.jpg?v=1613952286g" className='rounded w-100' alt='logo'/>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button variant="dark" className='d-flex buttonLogIn px-5 rounded-pill'>Log in</Button>
                </Col>
            </Row>
        </Container>
    )
}

export default HomeComp