import React, { useState } from 'react'
import { Form, Container, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useStoreActions } from 'easy-peasy';

export function UserLogin() {
    const [name, setName] = useState("")
    const [span, setSpan] = useState("")
    const register = useStoreActions(actions => actions.user.signup);

    function handleInputChange(e) {
        setName(e.target.value)
    }
    function handleSubmit() {
        register(name)
        setSpan("now login right now")

    }

    return (
        <div className="login">
            <Container className="d-flex align-items-center" style={{ height: "50vh" }}>
                <Form className="w-100">
                    <Form.Group>
                        <Form.Label>Enter your userName</Form.Label>
                        <Form.Control type="text" value={name} onChange={handleInputChange}></Form.Control>

                    </Form.Group>
                    <Link to={`/chat-interface/${name}/login`}>
                        <Button type="submit" className="btn btn-success mx-2">Login</Button>
                    </Link>

                    <Button type="button" className="btn btn-primary mx-2" onClick={

                        handleSubmit
                    }>New Account</Button>
                    <span>{span !== "" ? span : ''}</span>


                </Form>
            </Container>
        </div>
    )


}
