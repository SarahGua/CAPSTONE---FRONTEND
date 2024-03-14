import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavBarComp(){
    return (
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary bg-darkBlue mb-5 mt-2" bg="dark" data-bs-theme="dark">
            <Container>
            <Navbar.Brand href="#home">EventConnect</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                    <Nav.Link href="/welcome">Home</Nav.Link>
                    <Nav.Link href="/list">Exhibitor List</Nav.Link>
                    <Nav.Link href="/agenda">Agenda</Nav.Link>
                    <Nav.Link href="/myprofile">Profile</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBarComp