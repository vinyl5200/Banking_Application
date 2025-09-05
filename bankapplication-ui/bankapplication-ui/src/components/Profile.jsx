import React from 'react';
import AuthService from '../services/auth.service';
import { Container, Card, Spinner } from 'react-bootstrap';

const Profile = () => {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) {
        return (
            <Container className="text-center mt-5">
                <Spinner animation="border" />
            </Container>
        );
    }

    return (
        <Container className="mt-4">
            <Card style={{width: '30rem', margin: 'auto'}}>
                <Card.Header><h3><strong>{currentUser.username}</strong> Profile</h3></Card.Header>
                <Card.Body>
                    <p><strong>Token:</strong> {currentUser.token.substring(0, 20)}...{currentUser.token.substring(currentUser.token.length - 20)}</p>
                    <p><strong>Id:</strong> {currentUser.id}</p>
                    <p><strong>Email:</strong> {currentUser.email}</p>
                    <strong>Authorities:</strong>
                    <ul>
                        {currentUser.roles && currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
                    </ul>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Profile;
