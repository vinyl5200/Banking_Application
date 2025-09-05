import React, { useState } from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import UserService from '../services/user.service';
import AuthService from '../services/auth.service';

const Transfer = ({ account, onTransferSuccess }) => {
    const [toAccountNumber, setToAccountNumber] = useState('');
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [successful, setSuccessful] = useState(false);

    const handleTransfer = (e) => {
        e.preventDefault();
        setMessage('');
        setLoading(true);

        const fromAccountNumber = account.accountNumber;

        UserService.transferFunds({ fromAccountNumber, toAccountNumber, amount })
            .then(response => {
                setMessage(response.data.message);
                setSuccessful(true);
                setLoading(false);
                setToAccountNumber('');
                setAmount('');
                // Notify the parent component (Dashboard) that a transfer was successful
                if (onTransferSuccess) {
                    onTransferSuccess();
                }
            })
            .catch(error => {
                const resMessage = (error.response && error.response.data && error.response.data.message) || error.toString();
                setMessage(resMessage);
                setSuccessful(false);
                setLoading(false);
            });
    };

    return (
        <Form onSubmit={handleTransfer} className="mt-4">
            <Form.Group className="mb-3" controlId="toAccountNumber">
                <Form.Label>Recipient Account Number</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter account number"
                    value={toAccountNumber}
                    onChange={(e) => setToAccountNumber(e.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="amount">
                <Form.Label>Amount</Form.Label>
                <Form.Control
                    type="number"
                    placeholder="0.00"
                    min="0.01"
                    step="0.01"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                />
            </Form.Group>

            <div className="d-grid">
                <Button variant="primary" type="submit" disabled={loading || !toAccountNumber || !amount}>
                    {loading ? (
                        <>
                            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                            <span className="ms-2">Processing...</span>
                        </>
                    ) : (
                        'Transfer Funds'
                    )}
                </Button>
            </div>

            {message && (
                <Alert variant={successful ? 'success' : 'info'} className="mt-3">
                    {message}
                </Alert>
            )}
        </Form>
    );
};

export default Transfer;
