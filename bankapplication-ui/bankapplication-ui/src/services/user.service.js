import axios from 'axios';
import AuthService from './auth.service';

const API_URL = '/api/';

const authHeader = () => {
    const user = AuthService.getCurrentUser();
    if (user && user.token) {
        return { Authorization: 'Bearer ' + user.token };
    } else {
        return {};
    }
};

const getAccountDetails = () => {
    return axios.get(API_URL + 'accounts/my-account', { headers: authHeader() });
};

const transferFunds = (data) => {
    return axios.post(API_URL + 'transactions/transfer', data, { headers: authHeader() });
};

// This function was missing
const getTransactionHistory = (accountNumber) => {
    return axios.get(API_URL + `transactions/${accountNumber}`, { headers: authHeader() });
};

const UserService = {
    getAccountDetails,
    transferFunds,
    getTransactionHistory, // Add the function to the export
};

export default UserService;
