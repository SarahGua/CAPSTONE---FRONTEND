import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function NavBarComp(){
    return (
        <Container className='my-5'>
            <Navbar bg="dark" data-bs-theme="dark" className='bg-darkBlue'>
                {/* <Container className='d-flex justify-content-center'> */}
                    <Nav className="d-flex justify-content-evenly w-100">
                        {/* <Row className='w-100'>
                            <Col className=''> */}
                                <Link href="#home" className='text-light text-decoration-none' to="/welcome">Home</Link>
                                <Link href="#exhibitorList" className='text-light text-decoration-none' to="/list">Exhibitor List</Link>
                            {/* </Col>
                            <Col className=''> */}
                                <Link href="#agenda" className='text-light text-decoration-none' to="/agenda">Agenda</Link>
                            {/* </Col>
                            <Col className=''> */}
                                <Link href="#myprofilet" className='text-light text-decoration-none' to="/myprofile">Profile</Link>
                            {/* </Col>
                        </Row> */}
                    </Nav>
                {/* </Container> */}
            </Navbar>
        </Container>
    )
}

export default NavBarComp