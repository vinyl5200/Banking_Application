import React, { useState, useEffect, useCallback } from 'react';
import { Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';
import UserService from '../services/user.service';
import AuthService from '../services/auth.service';
import Transfer from './Transfer';
import TransactionHistory from './TransactionHistory'; // Import the new component

const Dashboard = () => {
    const [account, setAccount] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchAccountDetails = useCallback(() => {
        setLoading(true);
        UserService.getAccountDetails()
            .then(response => {
                setAccount(response.data);
                setLoading(false);
            })
            .catch(error => {
                const errorMessage = (error.response && error.response.data && error.response.data.message) || "Could not fetch account details. Please ensure an account is created for this user in the database.";
                setError(errorMessage);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        fetchAccountDetails();
    }, [fetchAccountDetails]);

    const currentUser = AuthService.getCurrentUser();

    if (loading && !account) {
        return (
            <Container className="text-center mt-5">
                <Spinner animation="border" />
                <p>Loading Account Details...</p>
            </Container>
        );
    }

    return (
        <Container className="mt-4">
            <h1 className="mb-4">Dashboard</h1>
            
            <Row>
                <Col md={7}>
                    <Card className="mb-4">
                        <Card.Header as="h5">Account Details</Card.Header>
                        <Card.Body>
                            {error && <Alert variant="danger">{error}</Alert>}
                            {account ? (
                                <>
                                    <Card.Text><strong>Account Holder:</strong> {currentUser.username}</Card.Text>
                                    <Card.Text><strong>Account Number:</strong> {account.accountNumber}</Card.Text>
                                    <Card.Title>
                                        Balance: ${account.balance.toFixed(2)}
                                        {loading && <Spinner animation="border" size="sm" className="ms-2" />}
                                    </Card.Title>
                                </>
                            ) : (
                                !error && <Card.Text>No account details found.</Card.Text>
                            )}
                        </Card.Body>
                    </Card>

                    {/* Add the TransactionHistory component here */}
                    {account && (
                        <Card>
                            <Card.Header as="h5">Transaction History</Card.Header>
                            <Card.Body>
                                <TransactionHistory accountNumber={account.accountNumber} />
                            </Card.Body>
                        </Card>
                    )}
                </Col>
                <Col md={5}>
                    <Card>
                        <Card.Header as="h5">Quick Actions</Card.Header>
                        <Card.Body>
                           {account ? (
                               <Transfer account={account} onTransferSuccess={fetchAccountDetails} />
                           ) : (
                               <p>Account details must be loaded to perform a transfer.</p>
                           )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Dashboard;
