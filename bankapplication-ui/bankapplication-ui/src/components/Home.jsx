import React from 'react';
import { Container } from 'react-bootstrap';

const Home = () => {
    return (
        <Container className="mt-5 text-center">
            <div className="p-5 mb-4 bg-light rounded-3">
                <div className="container-fluid py-5">
                    <h1 className="display-5 fw-bold">Welcome to the Banking Portal</h1>
                    <p className="col-md-8 fs-4 mx-auto">Your secure and reliable online banking solution. Please log in or sign up to continue.</p>
                </div>
            </div>
        </Container>
    );
};

export default Home;