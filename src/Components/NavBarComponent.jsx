import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function NavBarComp(){
    return (
        <Container className='my-5' 
        // style={{position: "sticky", top: "20px", zIndex: "100"}}
        >
            <Navbar bg="dark" data-bs-theme="dark" className='bg-darkBlue'>
                    <Nav className="d-flex justify-content-evenly w-100">
                                <Link href="#home" className='text-light text-decoration-none' to="/welcome">Home</Link>
                                <Link href="#exhibitorList" className='text-light text-decoration-none' to="/list">Exhibitor List</Link>
                                <Link href="#agenda" className='text-light text-decoration-none' to="/agenda">Agenda</Link>
                                <Link href="#myprofilet" className='text-light text-decoration-none' to="/myprofile">Profile</Link>
                    </Nav>
            </Navbar>
        </Container>
    )
}

export default NavBarComp