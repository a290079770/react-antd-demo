import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3001';
axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8';

export default axios;