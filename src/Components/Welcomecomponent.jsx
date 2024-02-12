import { Col, Container, Row } from "react-bootstrap"
import HomeComp from "./HomeComponent"
import NavBarComp from "./NavBarComponent"

function WelcomeComp(){
    return (
        <Container>
        <NavBarComp />
            <Container className="vh-100 d-flex flex-column justify-content-evenly">
                <Row>
                    <Col style={{
                        backgroundImage: 'url("https://cdn.pixabay.com/photo/2014/11/28/11/04/textile-548716_640.jpg")',
                        backgroundSize: 'cover', // opzionale: adatta l'immagine alla dimensione del contenitore
                        backgroundRepeat: 'no-repeat', // opzionale: evita la ripetizione dell'immagine
                        height: '50vh', // altezza della colonna
                        width: '100%', // larghezza della colonna>
                    }}>
                        
                    </Col>
                </Row>
                <Row>
                    <Col className="text-white">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem sequi ad commodi iure, aspernatur iusto incidunt aperiam atque. Officiis impedit minus iure in molestiae aliquid labore officia aspernatur odio excepturi! Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia quas facere voluptatibus. Qui, pariatur. Sequi voluptatem mollitia delectus ea. Exercitationem excepturi expedita laboriosam nobis quo quae, iste optio quam omnis! Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum recusandae adipisci hic porro doloremque quam molestias deserunt possimus vel aut vitae praesentium provident ipsum, eum laudantium alias nihil perspiciatis quos?</Col>
                </Row>
            </Container>
        </Container>
    )
}

export default WelcomeComp