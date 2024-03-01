import { Button, Col, Container, Row } from "react-bootstrap"
import NavBarComp from "./NavBarComponent"
import Carousel from 'react-bootstrap/Carousel';
import img1 from '../Img/img1.jpg';
import img2 from '../Img/img2.jpg';
import img3 from '../Img/img3.jpg';
import img4home from '../Img/img4home.jpg';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function WelcomeComp(){

    const [user, setUser] = useState([])

    const getUserProfile = () => {
        const token = localStorage.getItem('token')
        console.log(token)

        fetch(process.env.REACT_APP_BE_URL + `/user/token/${token}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .then((res) => {
            if(res.ok){
                return res.json()
            } else {
                throw new Error('Errore nel recupero dati')
            }
        })
        .then((data) => {
            console.log(data)
            setUser(data)
            
        })
        .catch((err) => console.log(err, "errore"))
    }

    useEffect(() => {
        getUserProfile()
        console.log(user)
    }, []) 

    return (
        <Container>
        <NavBarComp />
            <Container className="vh-25">
                <Row>
                    <Col className="d-flex justify-content-center">
                    </Col>
                </Row>
                <Row className="d-flex align-items-center my-5">
                    <Col>
                        <img src={img1} className="fluid w-100" alt="img1"></img>
                    </Col>
                    <Col className="text-white p-6 font-monospace">
                        <p className="fs-5 lh-lg">Welcome to EVENTConnect, an online sourcing platform and knowledge hub created for the textile and garment industry. 
                            The platform enables buyers and sellers to be engaged before, during and after the physical exhibitions.
                            EVENTConnect brings the global community of textile industrialists and experts together to collaborate and transform the industry. 
                            Leverage the platform to source for innovative technologies presented by direct machinery and technology manufacturers, 
                            be matched with the right business partners.</p>    
                    </Col>
                </Row>
                <Row className="mt-6">
                    <Col className="d-flex justify-content-center">
                        {
                            user.role === 'EXHIBITOR' ? (
                                <Link to={`/standBooking`} className=" text-decoration-none">
                                <Button variant="primary" className="border border-lightn bg-transparent border-3 mt-3">Book your booth NOW!</Button>
                                </Link>
                            ) : (
                                <Link to={`/ticket`} className=" text-decoration-none">
                                <Button variant="primary" className="border border-lightn bg-transparent border-3 mt-3">Book your tickets NOW!</Button>
                                </Link>
                            )
                        }
                    </Col>
                </Row>
            </Container>
        </Container>
    )
}

export default WelcomeComp