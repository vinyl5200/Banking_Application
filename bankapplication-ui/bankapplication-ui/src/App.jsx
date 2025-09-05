import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

import AuthService from './services/auth.service';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Profile from './components/Profile';
import Dashboard from './components/Dashboard';
import AdminBoard from './components/AdminBoard'; // Import the new component

const PrivateRoute = ({ children }) => {
    const user = AuthService.getCurrentUser();
    return user ? children : <Navigate to="/login" />;
};

function App() {
    const [currentUser, setCurrentUser] = useState(undefined);
    const [showAdminBoard, setShowAdminBoard] = useState(false);

    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user) {
            setCurrentUser(user);
            // Check if the user has the ADMIN role
            setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
        }
    }, []);

    const logOut = () => {
        AuthService.logout();
        setCurrentUser(undefined);
        setShowAdminBoard(false);
    };

    return (
        <div>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand as={Link} to="/">Banking Portal</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/home">Home</Nav.Link>
                            {currentUser && (
                                <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                            )}
                            {/* Show Admin Board link if user is an admin */}
                            {showAdminBoard && (
                                <Nav.Link as={Link} to="/admin">Admin Board</Nav.Link>
                            )}
                        </Nav>
                        {currentUser ? (
                            <Nav className="ms-auto">
                                <Nav.Link as={Link} to="/profile">{currentUser.username}</Nav.Link>
                                <Nav.Link as={Link} to="/login" onClick={logOut}>Logout</Nav.Link>
                            </Nav>
                        ) : (
                            <Nav className="ms-auto">
                                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                                <Nav.Link as={Link} to="/register">Sign Up</Nav.Link>
                            </Nav>
                        )}
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <div>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/profile" element={ <PrivateRoute><Profile /></PrivateRoute> } />
                    <Route path="/dashboard" element={ <PrivateRoute><Dashboard /></PrivateRoute> } />
                    {/* Add the route for the admin board */}
                    <Route path="/admin" element={ <PrivateRoute><AdminBoard /></PrivateRoute> } />
                </Routes>
            </div>
        </div>
    );
}

export default App;
