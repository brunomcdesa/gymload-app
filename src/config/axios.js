import axios from 'axios';


const axiosPublic = axios.create({ baseURL: 'https://gymload-api.onrender.com'});

export { axiosPublic };