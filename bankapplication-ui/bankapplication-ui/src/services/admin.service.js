import axios from 'axios';
import AuthService from './auth.service';

const API_URL = '/api/admin/';

const authHeader = () => {
    const user = AuthService.getCurrentUser();
    if (user && user.token) {
        return { Authorization: 'Bearer ' + user.token };
    } else {
        return {};
    }
};

const getAllUsers = () => {
    return axios.get(API_URL + 'users', { headers: authHeader() });
};

const AdminService = {
    getAllUsers,
};

export default AdminService;
