import axios from 'axios';

const URL = 'http://127.0.0.1:8000/api/';

export const defaultInstance = axios.create({
	baseURL: URL,
	timeout: 3000
});

export const authInstance = axios.create({
	baseURL: URL,
	timeout: 2000,
	headers: {'Authorization': 'Token ' + localStorage.getItem('token')}
});

export default defaultInstance;