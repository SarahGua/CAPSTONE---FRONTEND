import { Button, Card, Container } from "react-bootstrap"
import NavBarComp from "./NavBarComponent"
import { useEffect, useState } from "react"

function Ticket(){

    const [numTickets, setNumTickets] = useState(1)

    const [user, setUser] = useState([])

    const [availableTickets, setAvailableTickets] = useState(10)

    const handleIncrement = () => {
        setNumTickets(prevNumTickets => prevNumTickets + 1);
    };

    const handleDecrement = () => {
        if (numTickets > 1) {
            setNumTickets(prevNumTickets => prevNumTickets - 1);
        }
    };

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

    const bookTickets = () => {
        const token = localStorage.getItem('token')

        const ticketData = {
            clientId: user.id
        }

        fetch(process.env.REACT_APP_BE_URL + '/ticket', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ticketData)
        })
        .then((res) => {
            if(res.ok){
                return res.json()
            } else {
                throw new Error("errore nella fetch")
            }
        })
        .then((data) => {
            console.log('biglietti oooook')
            setAvailableTickets(prevAvailableTickets => prevAvailableTickets - numTickets)
        })
        .catch((e) => {
            console.log(e)
        })
    }  
    
    const handleBooking = () => {
        if(numTickets <= availableTickets){
            for(let i = 0; i < numTickets; i++){
                bookTickets()
            }
        } else {
            console.log('erroreeee')
        }
    }
        

    useEffect(() => {
        getUserProfile()
    }, [])


    return (
        <Container>
            <NavBarComp />
                <Card>
                    <Card.Body className="d-flex flex-column align-items-center">
                        <Card.Title>Book your tickets!!</Card.Title>
                        <Card.Text className="d-flex flex-colummn align-items-center">
                            
                                <span>Your tickets will be available at the user desk inside the exhibition.</span>
                                {availableTickets > 1 ? (
                                    <span>Hurry up! Only {availableTickets} tickets are available!</span>
                                ) : (
                                    <span>Oh no! No tickets available... Hope to see you next time!</span>
                                )}
                            
                        </Card.Text>
                        <div>
                            <Button variant="primary" onClick={handleDecrement}>-</Button>
                            <span>{numTickets}</span>
                            <Button variant="primary" onClick={handleIncrement}>+</Button>
                        </div>
                        <Button variant="primary" className="mt-3" onClick={handleBooking} disabled={availableTickets ===0}>Book tickets</Button>
                    </Card.Body>
                </Card>
        </Container>
    )
}

export default Ticket