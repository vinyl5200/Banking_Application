import React, { useState } from 'react';
import AuthService from '../services/auth.service';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { Form, Button, Card, Container, Alert } from 'react-bootstrap';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); // Initialize the navigate function

    const handleRegister = (e) => {
        e.preventDefault();
        setMessage('');
        setSuccessful(false);

        AuthService.register(username, email, password).then(
            (response) => {
                setMessage(response.data.message);
                setSuccessful(true);
            },
            (error) => {
                const resMessage =
                    (error.response && error.response.data && error.response.data.message) ||
                    error.message || error.toString();
                setMessage(resMessage);
                setSuccessful(false);
            }
        );
    };

    return (
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "80vh" }}>
            <div className="w-100" style={{ maxWidth: "400px" }}>
                <Card>
                    <Card.Body>
                        <h2 className="text-center mb-4">Create an Account</h2>
                        <Form onSubmit={handleRegister} noValidate>
                            {!successful ? (
                                <>
                                    <Form.Group className="mb-3" controlId="username">
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="email">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="password">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                    </Form.Group>
                                    <Button className="w-100 mt-3" type="submit">Sign Up</Button>
                                </>
                            ) : (
                                <div className="text-center">
                                    <Alert variant="success">{message}</Alert>
                                    {/* This button now uses navigate to go to the login page */}
                                    <Button variant="primary" onClick={() => navigate('/login')}>
                                        Click here to Login
                                    </Button>
                                </div>
                            )}
                            
                            {message && !successful && (
                                <Alert variant='danger' className="mt-3">{message}</Alert>
                            )}
                        </Form>
                    </Card.Body>
                </Card>
                <div className="w-100 text-center mt-2">
                    Already have an account? <Link to="/login">Sign In</Link>
                </div>
            </div>
        </Container>
    );
};

export default Register;
