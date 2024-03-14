import { Button, Card, Col, Container, Row } from "react-bootstrap"
import NavBarComp from "./NavBarComponent"
import Form from 'react-bootstrap/Form';
import '../Home.css';
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";


function ExhibitorListComp(){

    const [field, setField] = useState([])
    const [users, setUsers] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [selectedField, setSelectedField] = useState('')

    const handleSelectedField = (e) => {
        setSelectedField(e.target.value)
    }

    useEffect(() => {
    }, [selectedField])

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value)
    }

    const getUsers = () => {
        const token = localStorage.getItem('token')
        console.log(token)
        fetch(process.env.REACT_APP_BE_URL + `/user`, {
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
            setUsers(data)
        })
        .catch((err) => {
            console.log('Errore', err)
        })
    }

    useEffect(() => {
        getUsers()
        console.log(users)
    }, [])

    const getFields = () => {
        const token = localStorage.getItem('token')
        fetch(process.env.REACT_APP_BE_URL + "/field", {
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
            setField(data)
        })
        .catch((err) => {
            console.log('Errore', err)
        })
    }

    useEffect(() => {
        getFields()
    }, [])

    return(
        <Container>
            <NavBarComp />
            <Row>
                <Col className="d-flex justify-content-center text-center">
                    <h1 className="text-white">Exhibitors List</h1>
                </Col>
            </Row>

            <Row className="mt-3">
                <Col>
                    <Form.Control 
                    type="text" 
                    placeholder="Find a company by name..." 
                    value={searchValue}
                    onChange={handleSearchChange}
                    />
                </Col>
                <Col>
                    <Form.Select aria-label="Default select example" onChange={handleSelectedField}>
                        <option value="">Select Field</option>
                        {field.map((field) => {
                            return (
                                <option key={field.id} value={field.description}>{field.description}</option>
                            )
                        })}
                    </Form.Select>
                </Col>
            </Row>

            {/* cards */}
            <Row className="mt-5">
                {
                    searchValue && users
                    .filter(user => user.role === "EXHIBITOR" && user.company_name && user.company_name.toLowerCase().includes(searchValue.toLowerCase()))
                    .map(user => (
                        <Col className="col-12 my-3" key={user.id}>             
                            <Card className="d-flex flex-row bg-darkBlue text-white">
                                <Card.Img variant="top" src={user.img_url} className="h-15" />
                                <Card.Body className="d-flex justify-content-between">
                                    <Container className="d-flex justify-content-start align-items-center">

                                    <Card.Title className="m-0">{user.company_name}</Card.Title>
                                    </Container>
                                    <Container className="d-flex justify-content-end align-items-center">
                                        <Link to={`/profile/${user.id}`} className=" text-decoration-none">
                                            <Card.Text className="m-0 me-3" style={{color:'black'}}>
                                            <Button variant="primary" className="border border-lightn bg-transparent border-3 mt-3">More info</Button>
                                            </Card.Text>
                                        </Link>
                                    </Container>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                }
                {
                    !searchValue && !selectedField &&(
                        users.map((user) => {
                            if(user.role === "EXHIBITOR"){
                                return (                                   
                                    <Col className="col-12 my-3" key={user.id}>             
                                    <Card className="d-flex flex-row bg-darkBlue text-white">
                                        <Card.Img variant="top" src={user.img_url} className="h-15" />
                                        <Card.Body className="d-flex justify-content-between">
                                            <Container className="d-flex justify-content-start align-items-center">
        
                                            <Card.Title className="m-0">{user.company_name}</Card.Title>
                                            </Container>
                                            <Container className="d-flex justify-content-end align-items-center">
                                                <Link to={`/profile/${user.id}`} className=" text-decoration-none">
                                                    <Button variant="primary" className="border border-lightn bg-transparent border-3 mt-3">More info</Button>
                                                </Link>
                                                <Card.Text className="m-0">
                                                </Card.Text>
                                            </Container>
                                        </Card.Body>
                                    </Card>
                                </Col>                              
                                )
                            }
                        })
                    )
                }
                {
                    field.map((f) => {
                        if (f.description === selectedField) {
                            return f.users.map((user) => (
                                <Col className="col-12 my-3" key={user.id}>             
                                    <Card className="d-flex flex-row bg-darkBlue text-white">
                                        <Card.Img variant="top" src={user.img_url} className="h-15" />
                                        <Card.Body className="d-flex justify-content-between">
                                            <Container className="d-flex justify-content-start align-items-center">
                                                <Card.Title className="m-0">{user.company_name}</Card.Title>
                                            </Container>
                                            <Container className="d-flex justify-content-end align-items-center">
                                                <Link to="/profile" className=" text-decoration-none">
                                                    <Card.Text className="m-0 me-3" style={{color:'black'}}>
                                                    <Button variant="primary" className="border border-lightn bg-transparent border-3 mt-3">More info</Button>
                                                    </Card.Text>
                                                </Link>
                                            </Container>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))
                        }
                    })
                }
            </Row>
        </Container>
    )
}

export default ExhibitorListComp