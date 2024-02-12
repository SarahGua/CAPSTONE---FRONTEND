import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavBarComp(){
    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark" className='bg-darkBlue'>
                <Container>
                <Nav className="me-auto d-flex w-100 justify-content-center">
                    <Nav.Link href="#home" className='text-light'>Exhibitor List</Nav.Link>
                    <Nav.Link href="#features" className='text-light'>Agenda</Nav.Link>
                    <Nav.Link href="#pricing" className='text-light'>Whish List</Nav.Link>
                </Nav>
                </Container>
            </Navbar>
        </>
    )
}

export default NavBarComp