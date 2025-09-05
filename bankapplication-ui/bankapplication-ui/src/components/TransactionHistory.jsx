import React, { useState, useEffect } from 'react';
import { Table, Button, Spinner, Alert } from 'react-bootstrap';
import UserService from '../services/user.service';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Papa from 'papaparse';

const TransactionHistory = ({ accountNumber }) => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (accountNumber) {
            UserService.getTransactionHistory(accountNumber)
                .then(response => {
                    setTransactions(response.data);
                    setLoading(false);
                })
                .catch(error => {
                    const errorMessage = (error.response && error.response.data && error.response.data.message) || "Could not fetch transaction history.";
                    setError(errorMessage);
                    setLoading(false);
                });
        }
    }, [accountNumber]);

    const downloadPDF = () => {
        const doc = new jsPDF();
        doc.text("Transaction Statement", 20, 10);
        doc.autoTable({
            head: [['Date', 'Description', 'Amount', 'From', 'To']],
            body: transactions.map(tx => [
                new Date(tx.timestamp).toLocaleDateString(),
                tx.description,
                `$${tx.amount.toFixed(2)}`,
                tx.fromAccount,
                tx.toAccount
            ]),
        });
        doc.save('transaction-statement.pdf');
    };

    const downloadCSV = () => {
        const csvData = transactions.map(tx => ({
            Date: new Date(tx.timestamp).toLocaleDateString(),
            Description: tx.description,
            Amount: tx.amount.toFixed(2),
            FromAccount: tx.fromAccount,
            ToAccount: tx.toAccount
        }));
        const csv = Papa.unparse(csvData);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", "transaction-statement.csv");
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    if (loading) {
        return <div className="text-center"><Spinner animation="border" /></div>;
    }

    if (error) {
        return <Alert variant="danger">{error}</Alert>;
    }

    return (
        <div>
            <div className="d-flex justify-content-end mb-3">
                <Button variant="outline-secondary" size="sm" onClick={downloadPDF} className="me-2">Download PDF</Button>
                <Button variant="outline-secondary" size="sm" onClick={downloadCSV}>Download CSV</Button>
            </div>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.length > 0 ? (
                        transactions.map(tx => (
                            <tr key={tx.id}>
                                <td>{new Date(tx.timestamp).toLocaleString()}</td>
                                <td>{tx.description}</td>
                                <td className={tx.fromAccount === accountNumber ? 'text-danger' : 'text-success'}>
                                    {tx.fromAccount === accountNumber ? '-' : '+'} ${tx.amount.toFixed(2)}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" className="text-center">No transactions found.</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    );
};

export default TransactionHistory;
